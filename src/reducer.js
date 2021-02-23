export const initialState={
    basket: [],
    user: null,
    user_details: {},
    store: [],
    guides: [],
    hindi_guides: [],
    site_info: {},
    site_settings: {},
    single_guides: {},
    sidebar: false,
    site_preview: {},
    site_colors: {},
    sidebarVandore: false,
    social: {},
    order_notification: 0,
    notification_token: '',
    brand: {},
    site_coupons: [],
    final_price: 0,
    applied_coupon: null
};


//SELECTOR
export const getBasketTotal= (basket) => 
    basket?.reduce((amount,item) => item.price*1 + amount, 0);



const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket,action.item],
            };
        case 'REMOVE_FROM_BASKET':
            const index= state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket= [...state.basket];
            if(index >= 0) {
                newBasket.splice(index,1);
            }else{
                console.warn(
                    `Can't remove product (id: ${action.id}) as its not in basket!`
                )
            }
            return {
                ...state, 
                basket: newBasket
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            } 
        case 'UPDATE_USER':
            return {
                ...state,
                user_details: action.user_details
            }
        case 'DELETE_USER':
            return {
                ...state,
                user_details: {}
            }
        case 'ADD_TO_STORE':
            return{
                ...state,
                store: action.store
            }
        case 'ADD_TO_GUIDES':
            return{
                ...state,
                guides: action.guides
            }
        case 'ADD_SITE_COUPONS':
            return{
                ...state,
                site_coupons: action.site_coupons
            }
        case 'ADD_FINAL_PRICE': 
            return{
                ...state,
                final_price: action.final_price
            }
        case 'ADD_APPLIED_COUPON':
            return{
                ...state,
                applied_coupon: action.applied_coupon
            }
        case 'ADD_TO_HINDI_GUIDES':
            return{
                 ...state,
                 hindi_guides: action.hindi_guides
            }
        case 'ADD_SITE_INFO':
            return {
                ...state,
                site_info: action.site_info
            }
        case 'ADD_SOCIAL_LINKS':
            return {
                ...state,
                social_links: action.social_links
            }
        case 'ADD_SITE_PREVIEW':
            return{
                ...state,
                site_preview: action.site_preview
            }
        case 'ADD_NOTIFICATION_TOKEN':
            return{
                ...state,
                notification_token: action.notification_token
            }
        case 'ADD_SITE_COLORS':
            return {
                ...state,
                site_colors: action.site_colors
            }
        case 'ADD_SITE_BRAND':
                return {
                    ...state,
                    brand: action.brand
            }
        case 'ADD_SITE_SETTINGS':
            return {
                ...state,
                site_settings: action.site_settings
            }
        case 'ADD_SINGLE_GUIDES':
            return{
                ...state,
                single_guides: action.single_guides
            }
        case 'UPDATE_SITE_SETTINGS':
            return {
                ...state,
                site_settings: {...state.site_settings, ...action.data}
            }
        case 'UPDATE_SIDEBAR':
            return{
                ...state,
                sidebar: action.sidebar
            }
        case 'ORDER_NOTIFICATION': {
            return{
                ...state,
                order_notification: action.order
            }
        }
        case 'UPDATE_SIDEBAR_VANDORE':
            return {
                ...state,
                sidebarVandore: action.sidebarVandore
            }
        default:  
            return state;
    }
};

export default reducer;