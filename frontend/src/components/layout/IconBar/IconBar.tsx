import NavIcon from '@/components/common/NavIcon/NavIcon';
import { MdHomeFilled } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import { FaStore } from 'react-icons/fa';
import { PiVideoFill } from 'react-icons/pi';
export default function IconBar() {
    return (
        <div>
            <NavIcon icon={MdHomeFilled} />
            <NavIcon icon={IoMdPeople} />
            <NavIcon icon={FaStore} />
            <NavIcon icon={PiVideoFill} />
        </div>
    );
}
