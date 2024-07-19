let t = 0;

 const setVal = (val)=> {
    if(val && val > 0){
        t = t+val
    }
    return t;
}
export default {setVal}
