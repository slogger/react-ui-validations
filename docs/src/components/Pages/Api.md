# API reference #

## ValidationContainer ###
Контейнер, внутри которого находятся валидируемые контролы.

### ``submit(): Promise<void>`` ###
При вызове этой функции загораются все невалидные котролы. Необходимо для реализации
сценария [валиадации при отправке формы](https://guides.kontur.ru/principles/validation/#07).

    <ValidationContainer ref='container'>
        // ...
        <Button onClick={() => this.refs.container.submit()}>Сохранить</Button>
    </ValidationContainer>

### ``validate(): Promise<boolean>`` ###
При вызове этой функции загораются все невалидные контролы так же как и при вызове
функции ``submit()``. Кроме того функция возвращает признак валидности формы.

    async handleSubmit() {
        const isValid = await this.refs.container.validate();
        if (isValid) {
            await this.save();
        }
    }

    render() {
        return (
            <ValidationContainer ref='container'>
                // ...
                <Button onClick={() => this.refs.container.submit()}>Сохранить</Button>
            </ValidationContainer>
        );
    }

### ``children`` ###
Предполагается, что в дочерних узлах содержатся контролы, поведением
которых будет управлять контейнер. В контекст добавляется объект,
в котором регистрируется дочерние контролы и реагируют на вызовы функций submit
и validate. Так же через контекст осуществляется
управление [поведением баллунов](https://guides.kontur.ru/principles/validation/#16).

### ``onValidationUpdated?: (isValid: boolean) => void`` ###

Данный callback вызывается в случае изменения состояния валидности дочерних контролов.

## ValidationWrapperV1 ##

Обертка для контрола, которая осуществляет управление свойствами контрола, ответственными за 
валидацию.

### ``children: React.Element<*>`` ###
Дочерный компонент должен быть ровно один. ValidationWrapperV1 контролирует его поведение путём передачи
prop-ов, используя соглашения retail-ui. Для отрисовки tooltip-а используется стандартный 
[Tooltip](http://tech.skbkontur.ru/react-ui/#/components/Tooltip). Для работы с компонентом используется
[React.cloneElement()](https://facebook.github.io/react/docs/react-api.html#cloneelement);

### ``validationInfo: ?ValidationInfo`` ###
где

    type ValidationInfo = { 
        type?: 'immediate' | 'lostfocus' | 'submit'; 
        message: string; 
    };

способ передать результат валидаций в ValidationWrapper. Если значение определено, контрол считается 
невалидным. Поле ``type`` используется для задания поведения валидации (значение по умолчанию: ``lostfocus``).

### ``renderMessage?: RenderErrorMessage`` ###
где

    type RenderErrorMessage =
        (
            control: React.Element<*>, 
            hasError: boolean, 
            validation: ?Validation
        ) => React.Element<*>;

Способ кастомизации отображения сообщения об ошибке (не путать с 
[подсветкой контрола](https://guides.kontur.ru/principles/validation/#13)).
Для задания определённых в гайдах способа отображения ошибок используйте функции ``tooltip`` и ``text`` 
(значение по умолчанию: ``tooltip('right middle')``).

Например,

    // ...
    <ValidationWrapperV1 
        renderMessage={tooltip('top center')} 
        validationInfo={{ ... }}>
    // ...
    </ValidationWrapperV1>

## tooltip(pos: string): RenderErrorMessage ##
Возвращает функцию для рендеринга сообщения об ошибке в виде тултипа. Используется для передачи в renderMessage.

Аргументы:

* ``pos``: строка передаваемая в соответствующий prop [retail-ui Tooltip-а](http://tech.skbkontur.ru/react-ui/#/components/Tooltip).

## text(pos: 'right' | 'bottom'): RenderErrorMessage
Возвращает функцию для рендеринга сообщения о ошибке в виде текстового блока рядом с контролом.
Используется для передачи в renderMessage. 

Аргументы:

* ``pos``: управляет положением текста и примает значения 'right' или 'bottom' для отображения сообщения справа или внизу соответственно.
