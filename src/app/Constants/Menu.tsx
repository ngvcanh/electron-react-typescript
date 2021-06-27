import * as Components from '../Components';
import { FaFileAudio } from 'react-icons/fa';
import { ERole } from './Role';

export const TitleBarMenu: Components.Layout.IMenuItem[] = [
  {
    name: 'File',
    items: [
      {
        name: 'New file',
        icon: FaFileAudio,
        role: {
          name: ERole.COPY,
          options: {
            aaa: 'bbb'
          }
        }
      },
      {
        name: 'New folder',
        onClick: () => console.log('Clicked New folder')
      },
      {
        isDivider: true
      },
      {
        name: 'Open',
        items: [
          {
            name: 'Open Google',
            href: 'https://google.com'
          },
          {
            name: 'Open folder'
          }
        ]
      }
    ]
  },
  {
    name: 'Edit'
  },
  {
    name: 'Selection'
  },
  {
    name: 'View'
  }
];