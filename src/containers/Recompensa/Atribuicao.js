import React, { useState } from 'react';

function AtribuirBonus(props) {
    const [id_user, setIdUser] = useState('');
    const [id_hemo, setIdHemo] = useState('');
    const [id_bonus, setIdBonus] = useState('');

    function handleAtribuirBonus() {
        fetch('/assignedbonus/add', {
            method: 'POST',
            body: JSON.stringify({
                id_user: id_user,
                id_hemo: id_hemo,
                id_bonus: id_bonus
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao atribuir bônus');
                }
                return response.json();
            })
            .then(data => {
                console.log('Bônus atribuído com sucesso:', data);
                // fazer algo com a resposta, se necessário
            })
            .catch(error => {
                console.error('Erro ao atribuir bônus:', error);
            });
    }

    return (
        <div>
            <label>
                ID do usuário:
                <input type="text" value={id_user} onChange={event => setIdUser(event.target.value)} />
            </label>
            <label>
                ID do hemocomponente:
                <input type="text" value={id_hemo} onChange={event => setIdHemo(event.target.value)} />
            </label>
            <label>
                ID do bônus:
                <input type="text" value={id_bonus} onChange={event => setIdBonus(event.target.value)} />
            </label>
            <button onClick={handleAtribuirBonus}>Atribuir bônus</button>
        </div>
    );
}

export default AtribuirBonus;
