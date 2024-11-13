var _a, _b;
function generateResume() {
    // Retrieve form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degree = document.getElementById('degree').value;
    var institution = document.getElementById('institution').value;
    var gradDate = document.getElementById('gradDate').value;
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var responsibilities = document.getElementById('responsibilities').value;
    var skills = document.getElementById('skills').value.split(',');
    // Generate resume
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n            <h2>Resume</h2>\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(name, "</span></p>\n            <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n            \n            <h3>Education</h3>\n            <p><strong>Degree:</strong> <span contenteditable=\"true\">").concat(degree, "</span></p>\n            <p><strong>Institution:</strong> <span contenteditable=\"true\">").concat(institution, "</span></p>\n            <p><strong>Graduation Date:</strong> <span contenteditable=\"true\">").concat(gradDate, "</span></p>\n            \n            <h3>Work Experience</h3>\n            <p><strong>Job Title:</strong> <span contenteditable=\"true\">").concat(jobTitle, "</span></p>\n            <p><strong>Company:</strong> <span contenteditable=\"true\">").concat(company, "</span></p>\n            <p><strong>Duration:</strong> <span contenteditable=\"true\">").concat(duration, "</span></p>\n            <p><strong>Responsibilities:</strong> <span contenteditable=\"true\">").concat(responsibilities, "</span></p>\n            \n            <h3>Skills</h3>\n            <p>").concat(skills.map(function (skill) { return "<span contenteditable=\"true\">".concat(skill.trim(), "</span>"); }).join(', '), "</p>\n        ");
        // Show shareable link and download options
        var username = document.getElementById('Username').value;
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        var shareableLink = document.getElementById('shareable-link');
        var shareableLinkContainer = document.getElementById('shareable-link-container');
        if (shareableLink) {
            shareableLink.href = shareableURL;
            shareableLink.textContent = shareableURL;
        }
        if (shareableLinkContainer) {
            shareableLinkContainer.style.display = 'block';
        }
        // Save the resume data to localStorage
        localStorage.setItem(username, JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            degree: degree,
            institution: institution,
            gradDate: gradDate,
            jobTitle: jobTitle,
            company: company,
            duration: duration,
            responsibilities: responsibilities,
            skills: skills
        }));
    }
}
// Event listener for form submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    generateResume();
});
// Handle PDF download
(_b = document.getElementById('download-pdf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    window.print(); // Opens the print dialog
});
// Restore data from URL parameters on page load
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('Username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('degree').value = resumeData.degree;
            document.getElementById('institution').value = resumeData.institution;
            document.getElementById('gradDate').value = resumeData.gradDate;
            document.getElementById('jobTitle').value = resumeData.jobTitle;
            document.getElementById('company').value = resumeData.company;
            document.getElementById('duration').value = resumeData.duration;
            document.getElementById('responsibilities').value = resumeData.responsibilities;
            document.getElementById('skills').value = resumeData.skills.join(', ');
            generateResume();
        }
    }
});
