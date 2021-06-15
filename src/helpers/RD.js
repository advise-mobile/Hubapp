import env from 'services/env';
import axios from 'axios';

const sendLead = async (identificador, formData) => {
  const url = `https://www.rdstation.com.br/api/1.2/conversions`;

  const data = {
    token_rdstation: env.rdToken,
    identificador: identificador,
    form_url: 'APP',
    ...formData
  }

  const response = await axios.post(url, data);

  return response;
};

export default sendLead;
