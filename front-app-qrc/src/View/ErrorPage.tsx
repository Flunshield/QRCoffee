import {useNavigate} from 'react-router-dom';
import Layout from '../ComposantsCommun/Layout';

export default function Error() {
    const navigate = useNavigate()

    return (
        <Layout>
            <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500} height={250}
            />
            <button className='btn'
                    onClick={() => {
                        navigate(-1)
                    }}
            >
                Page précédente
            </button>
        </Layout>
    )
}