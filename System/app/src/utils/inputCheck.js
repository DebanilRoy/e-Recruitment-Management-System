export function updateData(event, setDetails) {
    console.log("Update data called")
    setDetails(prevData => ({...prevData, [event.target.id]: event.target.value}))
}

export function inputCheck(event, regex) {
    return regex.test(event.target.value)
}

export function firstNameCheck(event, setDetails) {
    inputCheck(event, regex.firstNameRx) && updateData(event, setDetails)
}

export function lastNamecheck(event, setDetails) {
    inputCheck(event, regex.lastNameRx) && updateData(event, setDetails)
}

export function phoneNumberCheck(event, setDetails) {
    if (event.target.value.length > 10) {
        return
    } 
    
    else {
        inputCheck(event, regex.numberRx) && updateData(event, setDetails)
    }
}

export function pinCodeCheck(event, setDetails) {
    if (event.target.value.length > 6) {
        return
    } else {
        inputCheck(event, regex.numberRx) && updateData(event, setDetails)
    }
}