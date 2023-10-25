let btnUp = document.querySelector('div.btn-up')
let btnCalc = document.querySelector('div.btn-calc')
let btnClear = document.querySelector('div.btn-clear')
let placesArray = [2,0,1]
let ipBoxes =  document.getElementsByClassName('ip')
let ipBoxesHexInput = ipBoxes[0].querySelector('div:nth-child(2)').getElementsByTagName('input')
let ipBoxesBinInput = ipBoxes[1].querySelector('div:nth-child(2)').getElementsByTagName('input')
let ipBoxesDecInput = ipBoxes[2].querySelector('div:nth-child(2)').getElementsByTagName('input')
function fucnOne()
{
    ipBoxes[placesArray[0]].style.backgroundColor = '#08F7FE'
    ipBoxes[placesArray[1]].style.backgroundColor = '#03c2c9'
    ipBoxes[placesArray[2]].style.backgroundColor = '#03c2c9'

    ipBoxes[placesArray[0]].style.zIndex = '1'
    ipBoxes[placesArray[1]].style.zIndex ='0'
    ipBoxes[placesArray[2]].style.zIndex = '-1'

    ipBoxes[placesArray[0]].style.top = '0%'
    ipBoxes[placesArray[1]].style.top = '60%'
    ipBoxes[placesArray[2]].style.top = '-60%'

    ipBoxes[placesArray[0]].style.transform = 'scale(1.05)'
    ipBoxes[placesArray[1]].style.transform = 'scale(.95)'
    ipBoxes[placesArray[2]].style.transform = 'scale(.95)'
    if(btnUp.style.opacity == '0') {btnUp.style.opacity = '1'}
}
window.addEventListener('load', () => {fucnOne()})
btnUp.addEventListener('click', () =>
{
    placesArray.unshift(placesArray.pop(placesArray))
    btnUp.style.opacity = '0'
    setTimeout(() => {btnUp.style.display = 'none'},250)
    setTimeout(() => {btnUp.style.display = 'flex'},850)
    setTimeout(() => {fucnOne()},950)
})
btnCalc.addEventListener('click', () =>
{
    let temptab = []
    function binnary()
    {
        for(i = 0; i < ipBoxesBinInput.length; i++)
        {
            for(let x = 0; x <= 8 - ipBoxesBinInput[i].value.length - 1; x++) {temptab.push(0)}
            temptab.push(ipBoxesBinInput[i].value)
            ipBoxesBinInput[i].value = temptab.join('')
            let tempvalue = parseInt(temptab.join(''), 2).toString(16).toUpperCase()
            ipBoxesHexInput[i].value = (tempvalue.length + '0x'.length == 3) ? ipBoxesHexInput[i].value = '0x0' + tempvalue : ipBoxesHexInput[i].value = '0x' + tempvalue
            ipBoxesDecInput[i].value = parseInt(ipBoxesBinInput[i].value, 2)
            temptab.splice(0, temptab.length)
        }
    }
    if(placesArray[0] == 1) //BIN
    {
        binnary()
    }
    else if(placesArray[0] == 2) //DEC
    {
        for(i = 0; i < ipBoxesDecInput.length; i++)
        {
            if(ipBoxesDecInput[i].value.length == 0) {ipBoxesDecInput[i].value = 0}
            ipBoxesBinInput[i].value = Number(ipBoxesDecInput[i].value).toString(2)
        }
        binnary()
    }
    else //HEX
    {
        for(i = 0; i < ipBoxesHexInput.length; i++)
        {
            if(ipBoxesHexInput[i].value.length == 0) {ipBoxesHexInput[i].value = 0}
            if(ipBoxesHexInput[i].value.length == 4) {ipBoxesHexInput[i].value = ipBoxesHexInput[i].value.toString().slice(2)}
            ipBoxesBinInput[i].value = (parseInt(ipBoxesHexInput[i].value, 16).toString(2)).padStart(8, '0')
        }
        binnary()
    }
})
btnClear.addEventListener('click', () =>
{
    for(i = 0; i < ipBoxesBinInput.length; i++) {ipBoxesBinInput[i].value = ''}
    for(i = 0; i < ipBoxesDecInput.length; i++) {ipBoxesDecInput[i].value = ''}
    for(i = 0; i < ipBoxesHexInput.length; i++) {ipBoxesHexInput[i].value = ''}
})