import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/PostPage.css';
import Header from '../CommonPostPage/Header';
import LeftSideBar from './LeftSidebar';
import MidContent from './MidContent';


function PostsPage() {
    return (
        <>
            <header className='container'>
                <Header></Header>
            </header>
            <main className='container'>
                <div className='row'>
                    <div className='left-sidebar-container col-3'>
                        <LeftSideBar></LeftSideBar>
                    </div>
                    <div className='content-container col-6'>
                        <MidContent></MidContent>
                    </div>
                    <div className='right-sidebar-container col-3'>
                        <LeftSideBar></LeftSideBar>
                    </div>
                </div>
            </main>
            <footer className='container'>

            </footer>
        </>
    )
}

export default PostsPage;