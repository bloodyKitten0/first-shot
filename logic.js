let playerInput = document.getElementById("playerName")
        let classInput = document.getElementById("playerClass")
        let levelInput = document.getElementById("level")
        let countSpace = document.getElementById("countBox")
        let userSpace = document.getElementById("usersBox")
        let tierSpace = document.getElementById("tierList")
        let doneButton = document.getElementById("doneButton")
        let clearButton = document.getElementById("clearButton")
        let cancelButton = document.getElementById("cancelButton")
        let eliteButton = document.getElementById("eliteButton")
        let pureButton = document.getElementById("pureButton")
        let doomButton = document.getElementById("doomButton")
        let totalLevelButton = document.getElementById("totalLevelButton")
        let averageButton = document.getElementById("averageButton")
        let topPlayerButton = document.getElementById("topPlayerButton")
        let topThreeButton = document.getElementById("topThreeButton")
        let users = []
        let editId = null
        let saved = localStorage.getItem("key")
        if (saved){
            users = JSON.parse(saved)
            render()
        }
        function saveCreation(){
            localStorage.setItem("key", JSON.stringify(users))
        }
        function doom(){
            users =[]
            editMode(false)
            localStorage.removeItem("key")
            clearInputs()
            render()
            editId = null
        }
        function rules(){
        if(users.some((user) =>{
            return user.name.toLowerCase().trim() === playerInput.value.trim().toLowerCase() && user.id !== editId})){
            alert("This name is already taken")
            return false
        }else if(playerInput.value.trim() === "" || classInput.value === "" || levelInput.value === ""){
                alert("please fill out all fields")
                return false
            }else if(Number(levelInput.value)< 1 || Number(levelInput.value) > 1000 ){
                alert("level must be between 1 and 1000")
                return false
            }else{
            return true
            }
        }
        function clearInputs(){
            playerInput.value = ""
            classInput.value = ""
            levelInput.value =""
        }
        function createUser(){
            let level = Number(levelInput.value)
            let tier = ""
            if(level === 1000){
                tier = "god"
            }else if(level >= 800){
                tier = "legendary"
        }else if(level >= 600){
            tier = "epic"
        }else if(level >= 400){
            tier = "rare"
        }else if(level >= 200){
            tier = "common"
        }else{
            tier = "unranked"
        }return {
            name: playerInput.value,
            class: classInput.value,
            level: level,
            tier: tier,
            miwa: playerInput.value.trim().toLowerCase() === "miwa"
        }
    }
    function tierReaction(user , owner){
        if(user.miwa){
            owner.style.color = "darkGreen"
            owner.style.fontFamily = "'Brush Script MT', cursive"
            owner.style.textShadow ="0 0 20px gold"
        }
        else if (user.tier === "god"){
            owner.style.color = "gold"
            owner.style.fontWeight = "bold"
            owner.style.fontFamily = "'Brush Script MT', cursive"
            owner.style.textShadow = "0 0 20px midNightBlue"
        }else if(user.tier === "legendary"){
            owner.style.color = "orange"
            owner.style.fontWeight = "bold"
        }else if(user.tier === "epic"){
            owner.style.color= "purple"
        }else if(user.tier === "rare"){
            owner.style.color = "blue"
    }else if(user.tier === "common"){
        owner.style.color ="Black"
    }else if(user.tier === "unranked"){
        owner.style.color = "gray"
    }
}
function check(id){
    return users.find((user)=> user.id === id)
}
function editMode(is){
    if(is){
        doneButton.textContent="save"
        cancelButton.style.display="inline-block"
    }else{
    doneButton.textContent="done"
    cancelButton.style.display="none"
}
}
function elite(){
    if(users.length >= 3 && users.every((user) => user.level >= 500)){
        return true
    }else{
        return false
    }
}
function pure(){
    return users.length >= 3 && users.every((user) => user.class === users[0].class)
}
function calculateTotal(){
        if (users.length ===0){
        return null}
   return users.reduce((acc , user)=>{
       return acc + user.level
    },0)
}
function topPlayer(){
    if (users.length ===0){
        return null}
   return users.reduce((acc , user)=>{
        if (user.level > acc.level){
            return user
        } return acc
    })
}
function topThree(){
    if (users.length === 3){
        return null}
       return users.slice(0,3).map((user)=>{
           return user.name
        })
    }
clearButton.addEventListener("click",()=>{
    clearInputs()
})
cancelButton.addEventListener("click",()=>{
    clearInputs()
    editMode(false)
    editId = null
})
eliteButton.addEventListener("click",()=>{
 if (elite()){
        alert("This is an elite team")
    }else{
        alert("This is not an elite team")
    }
})
pureButton.addEventListener("click",()=>{
if(pure()){
    alert("The whole team is the same class")
}else{
    alert("there must be an intruder among you it may be you or anyone")
}})
doomButton.addEventListener("click",()=> {
        doom()
    })
totalLevelButton.addEventListener("click",()=>{
    let total = calculateTotal()
    if (!calculateTotal()){
    alert("There's no players yet")
}else{
    alert(total)
}
})
averageButton.addEventListener("click", ()=>{
    let average = calculateTotal()/users.length
    if (!calculateTotal()){
        alert("There's no players yet")
    }else{
        alert(average.toFixed(1))
    }
})
topPlayerButton.addEventListener("click", ()=>{
    let best = topPlayer()
    if(!topPlayer()){
        alert("There's no players yet")
    }else{
        alert(best.name)
    }
})
topThreeButton.addEventListener("click",()=>{
    let top3 = topThree()
    if(!topThree()){
        alert("There's no players yet")
    }else{
        alert(top3.join(" | "))
    }
})
function render(){
    countSpace.innerHTML = ""
    userSpace.innerHTML = ""
    tierSpace.innerHTML = ""
    users.forEach((user) =>{
  let holder = document.createElement("div")
    holder.textContent = `player ${user.name} is a/an ${user.class} with the level of ${user.level}`
    tierReaction(user , holder)
    let idButton = document.createElement("Button")
    idButton.textContent ="ID"
    holder.appendChild(idButton)
    idButton.addEventListener("click",()=>
    alert(user.id)
    )
    let editButton = document.createElement("Button")
    editButton.textContent = "Edit"
    holder.appendChild(editButton)
    editButton.addEventListener("click",()=>{
    playerInput.value = user.name
    classInput.value = user.class
    levelInput.value= user.level
    editId = user.id
    editMode(true)
    })
    let deleteButton = document.createElement("Button")
    deleteButton.textContent="Delete"
    holder.appendChild(deleteButton)
    deleteButton.addEventListener("click", ()=>{
    if(confirm("you sure")){
     users =  users.filter((u)=> u.id !== user.id)
     render()
     saveCreation()
    }else{
        return
     }
    })
    tierSpace.appendChild(holder)
    })
    countSpace.textContent = `players number is:${users.length}`
    let nameHolder = document.createElement("div")
    let sortName = [...users].sort((a,b)=>a.name.localeCompare(b.name))
    sortName.forEach((user , index)=>{
        if(index > 0){
            nameHolder.appendChild(document.createTextNode(" | "))
        }
        let spanNames = document.createElement("span")
        spanNames.textContent = user.name
        tierReaction(user, spanNames)
        nameHolder.appendChild(spanNames)
    })
    userSpace.appendChild(nameHolder)
}
doneButton.addEventListener("click",()=>{
    if (!rules()){
        return
    }
    if(editId !== null){
    if(!check(editId)){
        editId = null
        editMode(false)
        return
    }
    users = users.map((u)=>{
        if(u.id === editId){
            return {...u,...createUser()}
        }else{
            return u
        }  
    }) 
    editId= null
    editMode(false)
}else{
        let user ={
            id: crypto.randomUUID(),
            ...createUser() 
        }
        users.push(user)
    }
    users.sort((a,b)=> b.level - a.level)
    render()
    clearInputs()
    saveCreation()
})