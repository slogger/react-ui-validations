// @flow
import React from 'react';
import Helmet from 'react-helmet';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';

import type {
    ContactInfo,
    ContactInfoValidationInfo,
    FormEditorProps,
} from '../../../../Domain/ContactInfo';

import Demo from '../../../Demo';
import Form from '../../../Form';

import { ValidationContainer, ValidationWrapperV1, text } from 'react-ui-validations';

function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Element<*> {
    return (
        <Form>
            <Form.Line title='Имя'>
                <ValidationWrapperV1
                    renderMessage={text()}
                    validationInfo={validationInfo.name}>
                    <Input
                        value={data.name}
                        onChange={(e, value) => onChange({ name: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Email'>
                <ValidationWrapperV1
                    renderMessage={text()}
                    validationInfo={validationInfo.email}>
                    <Input
                        value={data.email}
                        onChange={(e, value) => onChange({ email: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Телефон'>
                <ValidationWrapperV1
                    renderMessage={text('bottom')}
                    validationInfo={validationInfo.phone}>
                    <Input
                        value={data.phone}
                        onChange={(e, value) => onChange({ phone: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
        </Form>
    );
}

function validate(data: ContactInfo): ContactInfoValidationInfo {
    const result = {};
    if (data.name === '') {
        result.name = { type: 'submit', message: 'Имя надо указать' };
    }
    else if (data.name.split(' ').length !== 2) {
        result.name = { message: 'Имя должно состоять из двух слов' };
    }

    if (data.email === '') {
        result.email = { type: 'submit', message: 'Почту надо указать' };
    }
    else if (!data.email.includes('@')) {
        result.email = { message: 'Почта указана неверно' };
    }

    if (data.phone !== '' && !/^[\s\d\-\+\(\)]*$/.test(data.phone)) {
        result.phone = { message: 'Телефон должне состояить только из цифр, пробелов и знаков -,+,(,)' };
    }
    return result;
}

export default class DifferentMessages extends React.Component {
    state = {
        data: {
            name: '',
            email: '',
            phone: '',
            sex: null,
        },
    };

    handleSubmit() {
        this.refs.container.submit();
    }

    render(): React.Element<*> {
        return (
            <div>
                <Helmet title='Текстовые сообщения' />
                <h1>Текстовые сообщения</h1>
                <Demo>
                    <ValidationContainer ref='container'>
                        <FormEditor
                            data={this.state.data}
                            validationInfo={validate(this.state.data)}
                            onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
                        />
                        <Form.ActionsBar>
                            <Button use='primary' onClick={() => this.handleSubmit()}>Сохранить</Button>
                        </Form.ActionsBar>
                    </ValidationContainer>
                </Demo>
            </div>
        );
    }
}
