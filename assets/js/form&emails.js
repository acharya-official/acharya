let scope = 'Tuition';

function modeChanged(newMode) {
  if (newMode == 'online') {
    document.getElementById('input-address-details').style.display = 'none';
  }
  else {
    document.getElementById('input-address-details').style.display = 'block';
  }
}

function collapseAcademicBlock() {
  document.getElementById("formAreaTwo").classList.remove("show");
  document.getElementById("formSectionTwoBtn").classList.add("collapsed");
  document.getElementById("formSectionTwoBtn").setAttribute("aria-expanded", "false");
}

function collapsePersonalBlock() {
  document.getElementById("formAreaOne").classList.remove("show");
  document.getElementById("formSectionOneBtn").classList.add("collapsed");
  document.getElementById("formSectionOneBtn").setAttribute("aria-expanded", "false");
}


function changeScope(newScope) {
  if (newScope == 'mentorship') {
    document.getElementById("curriculum-switch").classList.remove("active-radio");
    document.getElementById("mentorship-switch").classList.add("active-radio");
    document.getElementById("message-mentorship-div").style.display = 'block';
    document.getElementById("message-div").style.display = 'none';
    document.getElementById("subjects-div").style.display = 'none';
    scope = 'Mentorship & Counselling';
  }
  else if (newScope == 'curriculum') {
    document.getElementById("mentorship-switch").classList.remove("active-radio");
    document.getElementById("curriculum-switch").classList.add("active-radio");
    document.getElementById("message-mentorship-div").style.display = 'none';
    document.getElementById("message-div").style.display = 'block';
    document.getElementById("subjects-div").style.display = 'block';
    scope = 'Tuition';
  }
}

function invokeEmail() {

  var chosenSubjects = getSubjects();
  var mode = (document.getElementById("online-mode").checked) ? "Online" : "Offline/Home Tution";

  var templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact_no: document.getElementById("contact_no").value,
    opted_for: scope,
    mode: mode,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    class: document.getElementById("class").value,
    board: document.getElementById("board").value,
    message: document.getElementById("message").value
  };

  if (scope == 'Tuition') {
    templateParams["message"] = document.getElementById("message").value;
    templateParams["subjects"] = chosenSubjects;
  }
  else {
    templateParams["message"] = document.getElementById("message-mentorship").value;
    templateParams["subjects"] = "NA";
  }

  const params = new URLSearchParams(templateParams);

  emailjs.send("become-aacharya", "template_1tkl9ue", templateParams).then(
    (response) => {
      console.log('Email sent successfully!', response.status, response.text);

      fetch(`https://script.google.com/macros/s/AKfycbxPBTdJ6610PCauHkNmAeK6ohAA9spPAVII5U3p2YhB0WedOmM0i_46WKLFfXuyz-F4/exec?${params}`, {
        method: "GET",
        mode: "no-cors"
      })
        .then(response => {
          console.log('Record added successfully!', response.status, response.text);
          alert("Your response has been received successfully. Our team will contact you soon to discuss your ward's learning needs.");
        })
        .catch(err => {
          console.error("Error:", err);
          alert("An error occurred while submitting the form.");
        });
    },
    (error) => {
      console.log('FAILED...', error);
      alert("Some error occured. Please try again!");
    },
  );

  //Clear Form
  clearForm();

}

function getSubjects() {
  const subjects = []
  if (document.getElementById("sub-eng").checked) {
    subjects.push("English")
  }
  if (document.getElementById("sub-comp").checked) {
    subjects.push("Computer")
  }
  if (document.getElementById("sub-maths").checked) {
    subjects.push("Mathematics")
  }
  if (document.getElementById("sub-phy").checked) {
    subjects.push("Physics")
  }
  if (document.getElementById("sub-chem").checked) {
    subjects.push("Chemistry")
  }
  if (document.getElementById("sub-bio").checked) {
    subjects.push("Biology")
  }
  if (document.getElementById("sub-econ").checked) {
    subjects.push("Economics")
  }
  if (document.getElementById("sub-elit").checked) {
    subjects.push("Eng Lit")
  }
  return subjects;
}


function clearForm() {
  document.getElementById("contact-form").reset();
}