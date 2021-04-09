import React from 'react';
import { connect } from 'react-redux';
import { characterAddedToList } from '../../actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import './add-own-character.scss';

const AddOwnCharacter = ({ characters, characterAddedToList}) => {
    const renderCharacters = () => {
        if(characters){
            return (
                characters.map((character) => {
                    return(
                        <article className="char-card" key={character.id}>
                            <div className="char-card-img">
                                <img src={character.image} alt={character.name}/>
                            </div>
                            <div className="char-card-details">
                                <div className="section">
                                    <span className="char-info">
                                        <h1>
                                            {character.name}
                                        </h1>
                                    </span>
                                </div>
                                <div className="section">
                                    <span className="text-gray">Gender:</span>
                                    <span className="char-info gender">{character.gender}</span>
                                </div>
                                <div className="section">
                                    <span className="text-gray">Email:</span>
                                    <span className="char-info">{character.email}</span>
                                </div>
                            </div>
                        </article>
                    );
                })
            )
        } 
    }

    return(
        <div className="add-own-character">
            <section className="form-section">
                <Formik
                    initialValues={{
                        gender: '',
                        email: '',
                        name: '',
                        imageUrl: ''
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.email || !values.gender || !values.name || !values.imageUrl) {
                            errors.email = 'All fields are required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        } else if(!/https?:\/\/.*\.(?:png|jpg|gif)/.test(values.imageUrl)){
                            errors.email = 'Invalid image-url';
                        }
                        return errors;
                    }}
                    onSubmit={(values , { resetForm}) => {
                        characterAddedToList({
                            name: values.name,
                            id: uuidv4(),
                            email: values.email,
                            gender: values.gender,
                            image: values.imageUrl
                        });
                        resetForm({});
                    }}
                >
                    {() => (
                        <Form className="add-char-form">
                            <div className="add-char-form-grid">
                                <div className="form-input-group lable-large main-input">
                                    <label htmlFor="name">Name</label>
                                    <Field id="name" name="name" placeholder="Jane" />
                                    <label htmlFor="imageUrl">Image url</label>
                                    <Field id="imageUrl" name="imageUrl" placeholder="https://i.imgur.com/8nLFCVP.png" />
                                    <label htmlFor="email">email</label>
                                    <Field type="email" name="email" />
                                    <ErrorMessage className="validation-error-message" name="email" component="div" />
                                </div>
                                <div className="form-input-group">
                                    <label className="radio-group-label lable-large" id="my-radio-group">Gender</label>
                                    <div className="form-radio-group" role="group" aria-labelledby="my-radio-group">
                                        <label>
                                            <Field className="gender-radio" type="radio" name="gender" value="male" />
                                            Male
                                        </label>
                                        <label>
                                            <Field className="gender-radio" type="radio" name="gender" value="female" />
                                            Female
                                        </label>
                                        <label>
                                            <Field className="gender-radio" type="radio" name="gender" value="genderless" />
                                            Genderless
                                        </label>
                                        <label>
                                            <Field className="gender-radio" type="radio" name="gender" value="unknown" />
                                            Unknown
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-submit" type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
            <section className="char-cards-section">
                <div className="char-cards-grid">
                    {
                        renderCharacters()
                    }
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = ({ characters }) => {
    return { characters };
};

const mapDispatchToProps= (dispatch) => {
    return {
        characterAddedToList: (character) => dispatch(characterAddedToList(character))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddOwnCharacter);