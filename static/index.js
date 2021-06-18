
function createSubKey(parent) {
  const topContainer = parent.parentElement
  const key = "adf"
  const name = document.createElement('input')
  name.type = 'Text'
  name.placeholder = "Enter Sub Key Name "
  const type = document.createElement('select')
  let typeName = ['int', 'list', 'string']
  for (i of typeName) {
    elem = document.createElement('option')
    elem.value = i
    elem.innerText = i
    type.appendChild(elem)
  }
  type.style.marginLeft = "12px"
  type.style.marginRight = "12px"


  const checkBox = document.createElement('input')
  checkBox.type = 'checkBox'

  const deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete Attribute"
  deleteButton.onclick = (e) => {
    const item = e.target
    const parentElement = item.parentElement
    const container = parentElement.parentElement
    container.removeChild(parentElement)

    if (container.getElementsByTagName('fieldset').length == 0) {
      container.lastChild.style.display = 'inline'
    }

  }


  const container = document.createElement('fieldset')

  container.id = key
  const label1 = document.createElement('label')
  label1.style.margin = "4px"
  label1.innerHTML = " Enter Sub Key Name"
  container.appendChild(label1)
  container.appendChild(name)
  const label2 = document.createElement('label')
  label2.style.margin = "4px"
  label2.innerHTML = "Select Value Type Of Key "
  container.appendChild(label2)
  container.appendChild(type)
  const label3 = document.createElement('label')
  label3.style.margin = "4px"
  label3.innerHTML = " Is It Mandatory Attribute "
  container.appendChild(label3)
  container.appendChild(checkBox)
  container.appendChild(deleteButton)

  // container.
  container.style.margin = '15px'
  container.style.marginLeft = '30px'
  topContainer.lastChild.before(container)
  topContainer.lastChild.style.display = 'block'
  topContainer.lastChild.style.margin = 'auto'



}

childCount = 1
function createTopKey(id) {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Enter Top Key Name'

  const AddSubKey = document.createElement('button')
  AddSubKey.innerText = 'Add Sub Key '
  AddSubKey.onclick = (e) => {
    const parent = e.target.parentElement
    if (parent.getElementsByTagName('input')[0].value == "") {
      alert("Key Can't be Empty")
    }
    else
      createSubKey(e.target)
  }
  childCount += 1;

  const deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete Key"
  deleteButton.onclick = (e) => {
    const item = e.target
    const parentElement = item.parentElement
    const container = parentElement.parentElement
    container.removeChild(parentElement)
  }
  const container = document.createElement('div')
  container.id = id
  container.appendChild(input)

  container.appendChild(deleteButton)
  container.appendChild(AddSubKey)
  deleteButton.style.marginLeft = "5px"
  deleteButton.style.marginRight = "5px"


  container.style.margin = "20px"
  return container


}
NewAnimalJson = {}
function submitForm(submitButton) {
  const container = submitButton.parentElement.parentElement
  const arrayTopKey = Array.from(container.getElementsByTagName('div'))
  arrayTopKey.pop()
  let isValid = true
  for (div of arrayTopKey) {
    const TopInput = Array.from(div.getElementsByTagName('input'))
    const key = (TopInput.shift()).value.trim().toLowerCase()
    if (key == "") {
      isValid = false
      break;
    }
    const fieldList = Array.from(div.getElementsByTagName('fieldset'))
    NewAnimalJson[key] = []
    for (fs of fieldList) {
      const items = fs.children
      const subkey = {}
      subkey["name"] = items[1].value.trim().toLowerCase()
      if (subkey["name"] == "") {
        isValid = false
        break
      }
      subkey["type"] = items[3].value
      subkey["imp"] = items[5].checked
      NewAnimalJson[key].push(subkey)

    }
    if (NewAnimalJson[key].length == 0) {
      NewAnimalJson[key] = ""
    }
    if (!isValid) break
  }
  if (Object.keys(NewAnimalJson).length === 0) {
    alert(" Form Not Created as There Is No Key ")
    return
  }
  const AnimalName = document.getElementById('AnimalName').value.trim().toLowerCase()
  if (isValid) {
    console.log(NewAnimalJson)
    $.ajax({
      type: "POST",
      data: JSON.stringify({ 'Format': NewAnimalJson, AnimalName }),

      // dataType: 'json',
      url: "{{ url_for('AddDetail') }}",
      // url: "/AddDetail",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        alert("Data Recorded")
      },
      error: function (err) {
        alert("Data Not Recorder Due To Some Error")
      }
    }).done(() => console.log("done"), document.getElementById('AddBreed').style.display = 'inline')

    const option = document.createElement('option')

    option.values = AnimalName
    option.innerHTML = AnimalName
    option.selected = true
    document.getElementById('Animal').lastElementChild.before(option)
    container.innerHTML = ""
    NewAnimalJson = {}
  }
  else {
    alert("one or more input box are empty")
  }
  // console.log(NewAnimalJson)
}
function createNewForm(Form) {
  const AnimalName = document.createElement('input')
  AnimalName.placeholder = "Enter Animal Name "
  AnimalName.type = 'Text'
  AnimalName.style.cssText = "display: block; margin:10px auto;";
  AnimalName.id = "AnimalName"
  const div = document.createElement('div')

  const AddNewKey = document.createElement('button')
  AddNewKey.innerText = 'Add New key'
  const Submit = document.createElement('button')
  Submit.innerText = 'Submit Form'
  AddNewKey.onclick = (e) => {
    let parent = e.target.parentElement
    const AnimalName = document.getElementById('AnimalName').value.trim().toLowerCase()
    const option = Array.from(document.getElementById('Animal').children)
    const found = option.some((item) => item.innerText == AnimalName)
    if (AnimalName == "" || found) {
      if (found) alert("Animal Already Exist")
      else alert("Enter Animal Name")
    }
    else
      parent.parentElement.lastChild.before(createTopKey('key'))
  }
  Submit.name = "SubmitData"
  Submit.onclick = (e) => submitForm(e.target)
  Form.style.margin = "10px"
  AddNewKey.style.marginRight = "5px"
  div.appendChild(AddNewKey)
  div.appendChild(Submit)

  div.style.display = 'flex'
  // div.style.alignItems = 'center'
  div.style.justifyContent = 'center'

  Form.appendChild(AnimalName)
  Form.appendChild(div)

}

let Form = document.getElementById('Create')
let Form2 = document.getElementById('Enter')
const handle = (e) => {

  const selected = $(e.currentTarget).val()
  submitButton = document.createElement('button')
  submitButton.innerText = "Submit"
  if (selected == "New Animal") {
    document.getElementById('AddBreed').style.display = 'none'
    Form2.innerHTML = ""
    /*
    $.ajax({
      type: "POST",
      // data: JSON.stringify(NewAnimalJson),
      // dataType: 'json',
      url: "{#{{ url_for('getNewData') }}#}",
      data: JSON.stringify({ id: 5 }),
      contentType: "application/text; charset=utf-8",
      success: function (response) {
        alert("Data Recorded")
      },
      error: function (err) {
        alert("Data Not Recorder Due To Some Error")
      }
    }).done(() => console.log("done"))*/


    createNewForm(Form)
    // parent.appendChild(submitButton)
  }
  else {
    document.getElementById('AddBreed').style.display = 'inline'
    Form.innerHTML = ""
  }
}
// handle.bind(this)
$("#Animal").on('change', handle);
$("#AddBreed").on('click', CreateBreedForm)
async function getData(url) {

  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  const data = await response.json();

  addChild(data['Format'])
}
function Validate(data) {
  const input = Array.from(Form2.getElementsByTagName('input'))
  const BreedKeyJson = {}
  const BreedName = input[0].value.trim().toLowerCase()
  if (BreedName == "") {
    alert("Breed Name Require")
    return;
  }
  let isValid = true


  BreedKeyJson[BreedName] = {}
  input.shift();
  for (key in data) {

    BreedKeyJson[BreedName][key] = {}
    if (data[key].length == 0) {
      const input = document.getElementsByName(key)
      let values = input.value
      if (values == undefined) {
        values = ""
      }
      values = values.trim().toLowerCase()
      BreedKeyJson[BreedName][key] = values
      continue
    }
    for (child of data[key]) {
      const input = document.getElementsByName(key + child.name)[0]
      let values = input.value
      if (values == "" && child.imp) {
        isValid = false
        alert(child.name + " is Required")
        break
      }
      if (input.type == "text") {
        values = values.trim().toLowerCase()
        if (values == "" && child.imp) {
          isValid = false
          alert(child.name + " is Required")
          break
        }
        if (input.getAttribute("data") == "list") {
          if (values == "") {
            values = []
          }
          else
            values = values.split(",")
        }
      }
      else {
        values = parseInt(values)
      }
      BreedKeyJson[BreedName][key][child.name] = values
    }
    if (!isValid) break
  }
  if (!isValid) {
    console.log("data Not Recorded")
    return;
  }
  console.log(BreedKeyJson)
  const AnimalName = $("#Animal").find(":selected").text();
  if (isValid) {
    $.ajax({
      type: "POST",
      data: JSON.stringify({ 'Breed': BreedKeyJson, AnimalName }),

      // dataType: 'json',
      url: "{{ url_for('AddDetail') }}",
      // url: "/AddDetail",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        alert("Data Recorded")
        Form2.innerHTML = "";
      },
      error: function (err) {
        alert("Data Not Recorder Due To Some Error")
      }
    }).done(() => console.log("done"))

  }
  // console.log(BreedKeyJson)
  // alert("Data Recorded")
}

function addChild(data) {

  for (elem in data) {
    const head = document.createElement('h4')
    head.innerText = elem
    head.style.fontStyle = 'italic'
    Form2.appendChild(head)

    const box = document.createElement('div')
    box.style.display = 'grid'
    box.style.justifyContent = 'space-between'
    box.style.gridTemplateColumns = 'auto auto auto'
    box.style.gridRowGap = "15px"

    if (data[elem] == "") {
      const input = document.createElement('input')
      input.name = elem
      input.placeholder = "Enter " + elem + " Value (String)"
      input.setAttribute("data", "string")
      input.type = "text"
      Form2.appendChild(input)
      continue
    }

    for (child of data[elem]) {
      // child = elem[child]
      const name = elem + child["name"]
      const type = child["type"]
      const img = child.imp;
      const divi = document.createElement('div')
      divi.style.display = 'flex'

      const label = document.createElement('label')
      label.style.marginRight = "10px"
      const inp = document.createElement('input');
      if (type == "int") {
        inp.setAttribute("data", "int")
        inp.type = 'number'
      }
      else {
        if (type == "list")
          inp.setAttribute("data", "list")
        else {
          inp.setAttribute("data", "text")
        }

        inp.type = "text"
      }


      let str = "Enter " + child['name']
      if (type == "list")
        str += " Value Comma Separated(List): "
      if (type == "int")
        str += " Value Type Number"
      label.innerText = str
      inp.placeholder = "Enter " + child['name']
      inp.name = name
      divi.append(label)
      divi.append(inp)
      box.appendChild(divi)
    }
    Form2.appendChild(box)
  }
  const sbmt = document.createElement('button')

  sbmt.innerText = 'Submit Form'
  sbmt.style.display = 'block'
  sbmt.style.margin = 'auto'
  sbmt.style.marginTop = "30px"
  sbmt.onclick = (e) => Validate(data)
  Form2.appendChild(sbmt)
  // console.log("hello")
  // console.log(data)
}

function CreateBreedForm() {
  const selected = $("#Animal").find(":selected").text();


  const url = '/animal/' + selected
  console.log(url)

  getData(url)
  // console.log(data)

  const BreedName = document.createElement('input')
  BreedName.placeholder = " Enter Breed Name "
  BreedName.style.display = "block"
  BreedName.style.margin = "auto"
  BreedName.type = 'text'

  Form2.appendChild(BreedName)




}




