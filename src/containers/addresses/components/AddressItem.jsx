import {motion } from 'framer-motion'
import {fadeInUp} from './../../../utility/utils'
function AddressItem(props) {
  const handleEdit = () => {
    props.Edit(address);
  };
  const handleDelete = () => {
    props.Delete(address.id);
  };
  const { address } = props;
  return (
    <motion.div variants={fadeInUp} className="flex items-center bg-white p-4 rounded-md mb-2">
      <span className="flex-grow">{address.title}</span>
      <div className="flex justify-center items-center mr-auto">
        <span
          className="flex justify-center items-center px-2"
          onClick={handleDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
        <span
          className="flex justify-center items-center px-2"
          onClick={handleEdit}
        >
          <i className="fa fa-edit"></i>
        </span>
      </div>
    </motion.div>
  );
}

export default AddressItem;
