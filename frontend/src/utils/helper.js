import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

// to ensure the email address the user types in is actually a correct email placeholder


export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ")
    let initials =""

    for (let i = 0; i<Math.min(words.length, 2); i++){
        initials += words[i][0]

        return initials.toUpperCase
    }
}
// to make the profile pic component in the sidebar to actually show just the initials of the user name like WU

export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return ""

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    :formattedInteger;
}
// to make it to be that the number/amount the user inout will have the formatted number value of the , eg 100000 is 100,000

export const prepareExpenseBarChartData = (data = []) =>{
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount
    }))

    return chartData
}


// to prepare the bar chart from the data fetched from the db

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

    const chartData =sortedData.map ((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source
    }))
    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.category
    }))
    return chartData
}