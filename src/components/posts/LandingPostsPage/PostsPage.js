import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/PostPage.css';
import Footer from '../CommonPostPage/Footer';
import Header from '../CommonPostPage/Header';
import LeftSideBar from './LeftSidebar';
import MidContent from './MidContent';
import RightSideBar from './RightSideBar';


function PostsPage() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className='container mb-5'>
                <div className='row'>
                    <div className='left-sidebar-container col-3'>
                        <LeftSideBar></LeftSideBar>
                    </div>
                    <div className='content-container col-6'>
                        <MidContent></MidContent>
                    </div>
                    <div className='right-sidebar-container col-3'>
                        <RightSideBar></RightSideBar>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default PostsPage;