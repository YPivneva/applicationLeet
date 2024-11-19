const userInfo: [string, number] = ['John', 26];

type Info = [string, number];

const showInfo = (info: Info) => {
    console.log(`Пользователь ${info[0]} имеет возраст ${info[1]} лет`);
}

showInfo(userInfo);