import * as R from 'ramda';

export const getProductsById = (state, id)=>R.prop(id, state.product);

export const getActiveCategoryAlias = ownProps=>{

    return R.path(['match', 'params', 'alias'], ownProps);
};

export const getProducts = (state, ownProps)=>{
    const activeCategoryAlias = getActiveCategoryAlias(ownProps);
    const applyCategory = (item)=>{
        return R.equals(
            activeCategoryAlias,
            R.prop('alias',  item)
        ); 

    };
   const products = R.compose(
        R.when(R.always(activeCategoryAlias), R.filter(applyCategory)),
        R.map(alias=>getProductsById(state, alias))
    )(state.productsPage.ids);
    return products;
};


export const getCategories = (state)=>{
    return R.values(state.Categories);
};

