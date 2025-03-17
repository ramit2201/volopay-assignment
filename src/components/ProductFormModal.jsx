import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectModalState,
} from '../redux/selectors/product';
import {
  closeModal,
  addProduct,
  updateProduct,
} from '../redux/reducers/product';
import Modal from './core/Modal';
import axios from 'axios';

const ProductFormModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalMode, modalProductData } = useSelector(selectModalState);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    rating: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
    if (modalMode === 'edit' && modalProductData) {
      setFormData({
        title: modalProductData.title,
        price: modalProductData.price,
        rating: modalProductData.rating,
        stock: modalProductData.stock,
        category: modalProductData.category,
      });
    } else {
      setFormData({
        title: '',
        price: '',
        rating: '',
        stock: '',
        category: '',
      });
    }
  }, [modalMode, modalProductData]);

  const handleClose = () => dispatch(closeModal());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === 'add') {
        const response = await axios.post('https://dummyjson.com/products/add', formData);
        dispatch(addProduct(response.data));
      } else if (modalMode === 'edit') {
        const response = await axios.put(
          `https://dummyjson.com/products/${modalProductData.id}`,
          formData
        );
        dispatch(updateProduct(response.data));
      }
    } catch (err) {
      // console.error('Error submitting form:', err);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <h2 className="text-xl font-bold mb-4">
        {modalMode === 'edit' ? 'Edit Product' : 'Add Product'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="border p-2 rounded"
        />
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {modalMode === 'edit' ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
