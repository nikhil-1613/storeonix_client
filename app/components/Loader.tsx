'use client';

import { HashLoader } from 'react-spinners';

type Props = {
  loading: boolean;
  fullScreen?: boolean;
};

export default function Loader({ loading, fullScreen = true }: Props) {
  if (!loading) return null;

  return (
    <div
      className={`${fullScreen ? 'fixed inset-0 z-50' : 'relative rounded-xl'}
        flex items-center justify-center bg-[#f8f1e9] bg-opacity-80`}
    >
      <HashLoader color="#cfa96a" size={60} />
    </div>
  );
}

// 'use client';

// import { HashLoader } from 'react-spinners';
// type Props = {
//   loading: boolean;
//   fullScreen?: boolean;
// };

// export default function Loader({ loading, fullScreen = true }: Props) {
//   if (!loading) return null;

//   return (
//     <div
//       className={`${fullScreen ? 'fixed inset-0 z-50' : 'relative'
//         } flex items-center justify-center bg-black bg-opacity-30`}
//     >
//       <HashLoader color="#0FF6FF" size={60} />
     
//     </div>
//   );
// }
