import apisauce from 'apisauce'

const create = (baseURL = 'http://www.rocksportradio.co.uk/') => {

    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache'
        },
        // 30 second timeout...
        timeout: 30000
    })
   // http://www.rocksportradio.co.uk/api/get_recent_posts/
    const getPosts = () => api.get('api/get_recent_posts/')
    //http://www.rocksportradio.co.uk/api/get_recent_posts/?post_type=podcast
    const getPodCasts = () => api.get('api/get_recent_posts/?post_type=podcast')

    const getShows = () => api.get('api/get_recent_posts/?post_type=shows')

    const getVideos = () => api.get('api/get_recent_posts/?post_type=qtvideo')

    const login = ({email, password}) => api.get('api/auth/generate_auth_cookie/?insecure=cool&username='+email+'&password='+password)

    const signup = ({userName, email, password, nOnce}) => api.get('/api/user/register/?username='+userName+'&email='+email+'&user_pass='+password+'&insecure=cool&nonce='+nOnce+'&display_name='+userName)

    const userMeta = ({cookie, mobile, sex, dob}) => api.get('http://www.rocksportradio.co.uk/api/user/update_user_meta_vars/?cookie='+cookie+'&insecure=cool&sex='+sex+'&DOB='+dob+'&mobile='+mobile)

    const getSponsors = () => api.get('api/get_recent_posts/?post_type=qtsponsor')

    return {
        getPosts,
        login,
        getPodCasts,
        signup,
        userMeta,
        getShows,
        getVideos,
        getSponsors,
    }
}

export default {
    create
}
