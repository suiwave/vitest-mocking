export const makeTitle = (title: string) => {
    // title => Title
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + '!!'
}

export const makeUserName = (userName: string) => {
    // yuji => Yuji san
    return userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() + ' san'
}