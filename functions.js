export function add(...args){
    console.log(args.reduce((acc, el)=> acc + el, 0))
}