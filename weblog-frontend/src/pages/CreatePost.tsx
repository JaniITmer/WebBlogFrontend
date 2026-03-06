import React, { useState} from 'react';
import { type FormEvent }from 'react';
import { type ChangeEvent } from 'react';
import axios from 'axios';

interface CreatePostProps {
  onPostCreated?: () => void; 
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return; 

    setLoading(true);

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setImage(null);
      setPreview(null);
      if(onPostCreated){
      onPostCreated}
      alert('Poszt létrehozva!');
    } catch (error) {
      console.error(error);
      alert('Hiba a posztolás során');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Mi jár a fejedben?"
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2"
          rows={3}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Kép hozzáadása (opcionális)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Előnézet" className="max-h-64 object-contain rounded" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!content.trim() && !image)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Küldés...' : 'Posztolás'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;