import React, { useState, ChangeEvent, FormEvent } from 'react';

export const Facturas: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert('Por favor selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await fetch('https://footballsandbox.azurewebsites.net/api/Competition/generateBillsFromCsv', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Authorization': 'Bearer TU_TOKEN',
        // },
      });

      if (!response.ok) {
        throw new Error('Error al generar las facturas.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Facturas.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error: any) {
      alert('Ocurrió un error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Generador de Facturas desde CSV</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Selecciona un archivo CSV:</label><br />
        <input type="file" id="file" accept=".csv" onChange={handleFileChange} required />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Subir y generar facturas'}
        </button>
      </form>
    </div>
  );
};

