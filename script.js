import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyCictQ3CpP0qjDwJBOHPY-R4TJT_7IhXts",
    authDomain: "experiment-12411.firebaseapp.com",
    databaseURL: "https://experiment-12411-default-rtdb.firebaseio.com",
    projectId: "experiment-12411",
    storageBucket: "experiment-12411.appspot.com",
    messagingSenderId: "510179886770",
    appId: "1:510179886770:web:94a43af4c59065c42debab"
  };
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const foodsInDB = ref(database, "foods");

const input = document.getElementById('input-field');
const btn = document.getElementById('add-button');
const ul = document.getElementById('list')

const processor = ()=>{
    const value = input.value.trim()
    if(value){
        push(foodsInDB, value)
    }
    clearInput()
}

onValue(foodsInDB, function(snapshot){
    if(snapshot.exists()){
        const snapshotArray = Object.entries(snapshot.val())
        clearList()
        for (let i=0; i < snapshotArray.length; i++){
        let currentItem = snapshotArray[i]
        let currentItemId = snapshotArray[i][0];
        let currentItemValue = snapshotArray[i][1]
        display(currentItem)
        }
    } else{
        ul.innerHTML = `<li class='noHover'>No items exist...</li>`
    }
})

const display = (entry)=>{
    const ID = entry[0]
    const value = entry[1]

    const li = document.createElement('li')
    li.textContent = value;
    ul.append(li)
    li.addEventListener('dblclick', ()=>{
        const exactLocation = ref(database, `foods/${ID}`);
        remove(exactLocation)
    })
}

const clearInput = ()=>{
    input.value = ''
}

const clearList = ()=>{
    ul.innerHTML = ''
}

btn.addEventListener('click', processor)
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        processor()
    }
})





