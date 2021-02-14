"use strict";
window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const Student = {
  fName: "",
  mName: "",
  lName: "",
  gender: "",
  house: "",
};

//initiates everything
function start() {
  console.log("start");
  loadJson();
}

function loadJson() {
  console.log(loadJson);
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      studentInfo(jsonData);
    });
}

function studentInfo(jsonData) {
  jsonData.forEach((jsonObject) => {
    //Create new object with cleaned data - and store that in the allStudent array
    const studentData = Object.create(Student);
    console.log(studentData);

    //split the full details into parts
    const infoSplit = jsonObject.fullname.trim().split(" ");
    const stuFName = jsonObject.fName;
    const stuMName = jsonObject.mName;
    const stuLName = jsonObject.lName;
    const stuHouse = jsonObject.house.trim();
    const stuGender = jsonObject.gender;
    //console.log(infoSplit);
    //console.log(stuGender);
    //console.log(stuHouse);
    if (infoSplit.length == 1) {
      studentData.fName = infoSplit[0];

      //to change first name in uppercase
      studentData.fName =
        studentData.fName[0].toUpperCase() +
        studentData.fName.substring(1).toLowerCase();
    } else if (infoSplit.length == 2) {
      studentData.fName = infoSplit[0];

      //to change first name in uppercase
      studentData.fName =
        studentData.fName[0].toUpperCase() +
        studentData.fName.substring(1).toLowerCase();

      //change last name to uppercase
      studentData.lName = infoSplit[1];
      studentData.lName =
        studentData.lName[0].toUpperCase() +
        studentData.lName.substring(1).toLowerCase();
    } else if (infoSplit.length == 3) {
      studentData.fName = infoSplit[0];

      //to change first name in uppercase
      studentData.fName =
        studentData.fName[0].toUpperCase() +
        studentData.fName.substring(1).toLowerCase();

      //to change mid name to upper case
      studentData.mName = infoSplit[1];
      studentData.mName =
        studentData.mName[0].toUpperCase() +
        studentData.mName.substring(1).toLowerCase();

      //change last name to uppercase
      studentData.lName = infoSplit[2];
      studentData.lName =
        studentData.lName[0].toUpperCase() +
        studentData.lName.substring(1).toLowerCase();
    }
    //studentData.name = infoSplit[0] + " " + infoSplit[1] + " " + infoSplit[2];
    studentData.gender = stuGender;
    studentData.gender =
      studentData.gender[0].toUpperCase() +
      studentData.gender.substring(1).toLowerCase();

    studentData.house = stuHouse;
    studentData.house =
      studentData.house[0].toUpperCase() +
      studentData.house.substring(1).toLowerCase();

    studentData.fName = studentData.fName;

    studentData.mName = studentData.mName;

    studentData.lName = studentData.lName;

    //to show letters afetr hyphen and "" in uppercase
    if (studentData.mName.includes('"')) {
      studentData.mName =
        studentData.mName[1].toUpperCase() +
        studentData.mName
          .substring(2, studentData.mName.lastIndexOf('"'))
          .toLowerCase();
    }

    if (studentData.lName.includes("-")) {
      studentData.lName =
        studentData.lName[0].toUpperCase() +
        studentData.lName
          .substring(1, studentData.lName.indexOf("-"))
          .toLowerCase() +
        " " +
        studentData.lName[studentData.lName.indexOf("-") + 1].toUpperCase() +
        studentData.lName
          .substring(studentData.lName.indexOf("-") + 2)
          .toLowerCase();
    }

    //show data
    allStudents.push(studentData);
  });

  displayList();
}

function displayList() {
  //console.log(displayList);
  //cleat the list
  document.querySelector("#thelist tbody").innerHTML = "";

  //create new list
  allStudents.forEach(displayStudent);
}

function displayStudent(students) {
  //console.log(displayStudent);
  //create clone
  const clone = document
    .querySelector("template#students")
    .content.cloneNode(true);

  //set clone data
  clone.querySelector("[data-field = first-name ]").innerText = students.fName;
  clone.querySelector("[data-field = middle-name ]").innerText = students.mName;
  clone.querySelector("[data-field = last-name ]").innerText = students.lName;

  clone.querySelector("[data-field = gender]").innerText = students.gender;
  clone.querySelector("[data-field =  house]").innerText = students.house;

  //append clone
  document.querySelector("#thelist tbody").appendChild(clone);
}
