import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faGlobe, faCircleQuestion, faKeyboard, faGear, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faPaperPlane, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config'
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images'
import Menu from '~/components/Propper/MenuItem';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import Image from '~/components/image'
import Search from '../Search'

const cx = classNames.bind(styles)
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English'
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt'
        },
        {
          type: 'language',
          code: 'jp',
          title: 'Japanese'
        },
        {
          type: 'language',
          code: 'chn',
          title: 'Chinese'
        },
        {
          type: 'language',
          code: 'ind',
          title: 'Hindi'
        },
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback'
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  }
]

function Header() {
  //Handle logic
  const handleMenuChange = (menuItem) => {

  }

  const currentUser = false

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View Profile',
      to: '/@hoaaa'
    },
    {
      icon: <FontAwesomeIcon icon={faTiktok} />,
      title: 'Get coins',
      to: '/coin'
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings'
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log Out',
      to: '/logout',
      separate: true
    },
  ]

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
        <img src={images.logo} alt="Tiktok" />
        </Link>
        
        <Search/>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button className={cx('action-upload-btn')} text leftIcon={<FontAwesomeIcon icon={faPlusSquare} />}>
                Upload
              </Button>
              <Tippy content="Messages" placement="bottom">
                <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </Tippy>    
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faMessage} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlusSquare} />}>
                Upload
              </Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/1e9ae54599d3fe641c57487daa3d0a4f~c5_100x100.jpeg?x-expires=1681830000&x-signature=0x%2FXs2o8tSbVPb6cqNYuhGa2CWM%3D' 
              className={cx('user-avatar')} 
              alt="" 
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;