import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38199190-357b16d82ad5caa1ff3a80ee2';
// const URL =
//   'https://pixabay.com/api/?q=cat&page=1&key=38199190-357b16d82ad5caa1ff3a80ee2&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async params => {
  console.log(params);
  const { data } = await axios.get(axios.defaults.baseURL, {
    params: {
      key: API_KEY,
      q: 'tree',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: 1,
      ...params,
    },
  });
  // console.log('data:', data);
  return data;
};
