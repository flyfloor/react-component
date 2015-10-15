export default class DataAccessor  {
    constructor() {
        // code
    };

    static getData(dom, attr){
        if (dom && attr) {
            try{
                return dom.dataset[attr];
            } catch(error){
                return dom.getAttribute(`data-${attr}`);
            }
        };
        return undefined;
    };

    static setData(dom, attr, value){
        if (dom) {
            try{
                dom.dataset[attr] = value;
            } catch(error){
                return dom.setAttribute(`data-${attr}`, value);
            }
        }; 
    }
}

export default DataAccessor;