import cogoToast from 'cogo-toast';

export const catchErrors = (e)=>{
    if (e){
        if (e.message) return cogoToast.error(e.message)
    }

    return cogoToast.error('Something went wrong')
}