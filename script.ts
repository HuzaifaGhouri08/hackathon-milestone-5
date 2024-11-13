// Define types for the form values
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    degree: string;
    institution: string;
    gradDate: string;
    jobTitle: string;
    company: string;
    duration: string;
    responsibilities: string;
    skills: string[];
}

function generateResume(): void {
    // Retrieve form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const institution = (document.getElementById('institution') as HTMLInputElement).value;
    const gradDate = (document.getElementById('gradDate') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const duration = (document.getElementById('duration') as HTMLInputElement).value;
    const responsibilities = (document.getElementById('responsibilities') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Generate resume
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    if (resumeOutput) {
        resumeOutput.innerHTML = `
            <h2>Resume</h2>
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
            
            <h3>Education</h3>
            <p><strong>Degree:</strong> <span contenteditable="true">${degree}</span></p>
            <p><strong>Institution:</strong> <span contenteditable="true">${institution}</span></p>
            <p><strong>Graduation Date:</strong> <span contenteditable="true">${gradDate}</span></p>
            
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> <span contenteditable="true">${jobTitle}</span></p>
            <p><strong>Company:</strong> <span contenteditable="true">${company}</span></p>
            <p><strong>Duration:</strong> <span contenteditable="true">${duration}</span></p>
            <p><strong>Responsibilities:</strong> <span contenteditable="true">${responsibilities}</span></p>
            
            <h3>Skills</h3>
            <p>${skills.map(skill => `<span contenteditable="true">${skill.trim()}</span>`).join(', ')}</p>
        `;
        
        // Show shareable link and download options
        const username = (document.getElementById('Username') as HTMLInputElement).value;
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
        const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
        const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;

        if (shareableLink) {
            shareableLink.href = shareableURL;
            shareableLink.textContent = shareableURL;
        }

        if (shareableLinkContainer) {
            shareableLinkContainer.style.display = 'block';
        }

        // Save the resume data to localStorage
        localStorage.setItem(username, JSON.stringify({
            name,
            email,
            phone,
            degree,
            institution,
            gradDate,
            jobTitle,
            company,
            duration,
            responsibilities,
            skills
        }));
    }
}

// Event listener for form submission
document.getElementById('resumeForm')?.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    generateResume();
});

// Handle PDF download
document.getElementById('download-pdf')?.addEventListener('click', () => {
    window.print(); // Opens the print dialog
});

// Restore data from URL parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData: ResumeData = JSON.parse(savedResumeData);
            (document.getElementById('Username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('degree') as HTMLInputElement).value = resumeData.degree;
            (document.getElementById('institution') as HTMLInputElement).value = resumeData.institution;
            (document.getElementById('gradDate') as HTMLInputElement).value = resumeData.gradDate;
            (document.getElementById('jobTitle') as HTMLInputElement).value = resumeData.jobTitle;
            (document.getElementById('company') as HTMLInputElement).value = resumeData.company;
            (document.getElementById('duration') as HTMLInputElement).value = resumeData.duration;
            (document.getElementById('responsibilities') as HTMLTextAreaElement).value = resumeData.responsibilities;
            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills.join(', ');
            generateResume();
        }
    }
});
