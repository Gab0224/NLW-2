import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    // const [, set] = useState();
    
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function handleCreateClass(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule: scheduleItems
        }).then(() => {
            alert("Cadastro realizado com sucesso");
        }).catch(() => {
            alert("Erro ao cadastrar, por favor tente novamente mais tarde.");
        });

        history.push('/');
    }

    function setScheduleValueItem(position: number, field: string, value: string){
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) return { ...scheduleItem, [field]: value };

            return scheduleItem;
        });

        console.log(newArray);
        setScheduleItems(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Ciência", label: "Ciência" },
                                { value: "Educação Física", label: "Educação Física" },
                                { value: "Física", label: "Física" },
                                { value: "Historia", label: "Historia" },
                                { value: "Matemática", label: "Matemática" },
                                { value: "Português", label: "Português" },
                                { value: "Química", label: "Química" },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da aula por hora"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        { 
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div className="schedule-item">
                                        <Select
                                            name="week_day"
                                            label="Dia da semana"
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleValueItem(index, 'week_day', e.target.value)}
                                            options={[
                                                {value:"0", label: "Domingo"},
                                                {value:"1", label: "Segunda-feira"},
                                                {value:"2", label: "Terça-feira"},
                                                {value:"3", label: "Quarta-feira"},
                                                {value:"4", label: "Quinta-feira"},
                                                {value:"5", label: "Sexta-feira"},
                                                {value:"6", label: "Sábado"},
                                            ]}
                                        />
                                        <Input
                                            name="from"
                                            label="De"
                                            value={scheduleItem.from} 
                                            onChange={e => setScheduleValueItem(index, 'from', e.target.value)}
                                        />
                                        <Input
                                            name="to"
                                            label="Até"
                                            value={scheduleItem.to} 
                                            onChange={e => setScheduleValueItem(index, 'to', e.target.value)} 
                                        />
                                    </div>
                                );
                            }) 
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>


        </div>
    );
}

export default TeacherForm;