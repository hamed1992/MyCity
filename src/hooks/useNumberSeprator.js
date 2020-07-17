
function useNumberSeprator(number) 
{
    return number ? Number((number)).toLocaleString().split(/\s/).join(',') : ""
}
export { useNumberSeprator };