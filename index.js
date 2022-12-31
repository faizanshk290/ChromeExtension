let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtnEl = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const delBtnEl = document.getElementById("delete-btn")
const saveTabEl = document.getElementById("save-tab-btn")

localStorageLeads = JSON.parse(localStorage.getItem("myLeads"))
if(localStorageLeads)
{
    myLeads = localStorageLeads
    render()
}

saveTabEl.addEventListener("click",()=>{
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        myLeads.push(tab[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render()
    })
})


delBtnEl.addEventListener("dblclick",()=>{
    localStorage.clear()
    myLeads = []
    render()
})

saveBtnEl.addEventListener("click",()=>{
    const value = inputEl.value
    if(value)
    {
        myLeads.push(value)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render()
        inputEl.value = "" 
    }    
})
function render()
{
    let leads = ""
    for(let i = 0 ; i < myLeads.length ; i++)
    {
        leads += 
        `
        <li>
            <a href='${myLeads[i]}' target='_blank'>${myLeads[i]}</a>
        </li>
        `
    }
    ulEl.innerHTML = leads
}
