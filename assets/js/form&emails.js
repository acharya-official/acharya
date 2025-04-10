function modeChanged(newMode) {
  if (newMode == 'online') {
    document.getElementById('input-address-details').style.display = 'none';
  }
  else {
    document.getElementById('input-address-details').style.display = 'block';
  }
}

function invokeEmail() {

  var chosenSubjects = getSubjects();
  var mode = (document.getElementById("online-mode").checked) ? "Online" : "Offline/Home Tution";

  var templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact_no: document.getElementById("contact_no").value,
    mode: mode,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    class: document.getElementById("class").value,
    board: document.getElementById("board").value,
    subjects: chosenSubjects,
    message: document.getElementById("message").value
  };

  emailjs.send("become-aacharya", "template_1tkl9ue", templateParams).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("We have recorded your response successfully!");
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