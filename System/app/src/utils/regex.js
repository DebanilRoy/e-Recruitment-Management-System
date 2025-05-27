const regex =  {
    "spaceRx" : /\s/,
    "firstNameRx" : /^$|^[A-Za-z]+$/,
    "lastNameRx" : /^$|^[A-Za-z]+(?:( [A-Za-z]+))*(\s?)$/,
    "numberRx" : /^\d{0,10}$/,
    "emailRx" : /^[a-z0-9]+(([\.-][a-z0-9]+)*)+@([a-z0-9]+([\.-][a-z0-9]+)*)\.[a-z]{2,}$/,
    "pinCodeRx" : /d{0,6}/,
    "passwordRx" : /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}/
}

export default regex