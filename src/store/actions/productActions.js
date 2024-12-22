import axios from 'axios'; // axios import

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';


// Thunk action to fetch products using axios
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('LOADING'));

  try {
    // Axios ile API çağrısı yapıyoruz
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.filter) queryParams.append('filter', params.filter);
    
    const url = `https://workintech-fe-ecommerce.onrender.com/products?${queryParams}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      console.log(data)
      dispatch(setFetchState('SUCCESS')); // Fetch işlemi başarıyla tamamlandı
      dispatch(setProductList(data.products)); // Ürünleri store'a kaydediyoruz
      dispatch(setTotal(data.total)); // Toplam ürün sayısını store'a kaydediyoruz
    } else {
      dispatch(setFetchState('FAILED')); // Eğer API'den hata dönerse
      dispatch(setProductList([])); // Ürünleri store'a kaydediyoruz
      dispatch(setTotal(0)); // Toplam ürün sayısını store'a kaydediyoruz
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState('FAILED')); // Hata durumunda
    dispatch(setProductList([])); // Ürünleri store'a kaydediyoruz
    dispatch(setTotal(0)); // Toplam ürün sayısını store'a kaydediyoruz
  }
};

// Action creators
export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});
