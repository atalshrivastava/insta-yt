import { PaperAirplaneIcon, BookmarkIcon, HeartIcon, EllipsisHorizontalIcon, ChatBubbleBottomCenterTextIcon, FaceSmileIcon} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled} from '@heroicons/react/24/solid'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({id, name, userImg, img, caption}) {
  const {data: session} = useSession()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  const sendComment = async(e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
try {
  
   await addDoc(collection(db, 'posts', id, 'comments'), {
    comment: commentToSend,
    username: session.user.username,
    userImg: session.user.image,
    timestamp: serverTimestamp() 
  })
} catch (error) {
  console.log(error)
}
    
  }

  useEffect(
    () => 
   onSnapshot(
    query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), 
    snapshot => {
      setComments(snapshot.docs)
    }
    ), [db, id])

    const likePost = async() => {

      if(hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
      } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username

      })
    }
    }

    useEffect(
      () => 
     onSnapshot(
      collection(db, 'posts', id, 'likes'), orderBy('timestamp', 'desc'), 
      snapshot => {
        console.log(snapshot.docs)
        setLikes(snapshot.docs)
      }
      ), [db, id])

      useEffect(
        () => 
        setHasLiked(
          likes.findIndex(like => like.id === session?.user?.uid) !== -1
          ),
       [likes])

       useEffect(() => {console.log(likes)}, [likes])

       console.log(hasLiked)

  return (
    <div className='bg-white my-7 rounded-sm border'>
      {/* header */}
      <div className='flex items-center p-5'>
        <img src={userImg} className="h-12 w-12 rounded-full object-contain border p-1 mr-3" alt="userImg" />
        <p className='flex-1 font-bold'>{name}</p>
        <EllipsisHorizontalIcon className='h-5' />
      </div>
      {/* img */}
      <img src={img} alt="img" className='object-cover w-full' />
      {session && (
<div className='flex justify-between px-4 pt-4'>
<div className='flex space-x-4'>
  {hasLiked ? (
    <HeartIconFilled onClick={likePost} className="btn text-red-500" />) : (
<HeartIcon className='btn' onClick={likePost} />
    
  )}
  
  <ChatBubbleBottomCenterTextIcon className='btn' />
  <PaperAirplaneIcon className='btn' />
</div>
<BookmarkIcon className='btn' />
</div>
      )}
      
      {/* caption */}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>{likes.length} likes</p>
        )}
    <span className='font-bold mr-1'>{name}</span>
    {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map(comment => (
            <div key={comment.id} 
            className="flex items-center space-x-2 mb-3">
              <img src={comment.data().userImg} 
               alt='userimage' className='h-7 rounded-full' />
               <p className='text-sm flex-1'>
                <span className='font-bold'>{comment.data().username} </span>
                {comment.data().comment}</p>
                <Moment fromNow className='pr-5 text-xs'>
                  {comment.data().timestamp?.toDate()}
                </Moment>

            </div>
          ))}
        </div>
      )}
      {/* inputbox */}
      {session && (
        <form className='flex items-center p-4'>
        <FaceSmileIcon className='h-7' />
        <input type={'text'} 
        value={comment} 
        onChange={e => setComment(e.target.value)} className="border-none flex-1 focus:ring-0" 
        placeholder='Add a comment...' />
        <button className='font-semibold text-blue-400' 
        type='submit' disabled={!comment.trim()} 
        onClick={sendComment}>Post</button>
        </form>
      )}
      
    </div>
  )
}

export default Post