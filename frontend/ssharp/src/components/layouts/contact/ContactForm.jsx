import React , { useState } from 'react';
import emailjs from 'emailjs-com';

const Result = () => {
    return (
        <p className="success-message">Thanks for your query. We will contact with you soon.</p>
    )
}

function ContactUsForm( { formStyle } ) {
    const [result, setResult] = useState( false );

    const sendEmail = ( e ) => {
        e.preventDefault();
        emailjs
        .sendForm(
            'service_bxh6md3', 
            'template_1g7v07n', 
            e.target, 
            'user_8Lx0gfI1ktOoeEN8DTV10'
        )
        .then( ( result ) => {
            console.log( result.text );
            }, 
            ( error ) => {
                console.log( error.text );
            }
        );
        e.target.reset();
        setResult( true );
    };

    setTimeout(() => {
        setResult( false );
    }, 5000);

    return (
        <form className={`${ formStyle }`} action="" onSubmit={ sendEmail }>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <input type="text" id="name" name="fullname" className="form-control" placeholder="Your Name"/>
                    </div>
                </div>
                
                <div className="col-lg-6">
                    <div className="form-group">
                        <input type="text" name="email" id="email" className="form-control" placeholder="Email Address"/>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group">
                        <input type="text" name="subject" id="subject" className="form-control" placeholder="Subject"/>
                    </div>
                </div>
                
                <div className="col-lg-12">
                    <div className="form-group">
                        <textarea id="message" name="message" cols="30" rows="6" className="form-control" placeholder="Your Message"></textarea>    
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="text-center">
                        <button className="btn btn-main w-100 rounded" type="submit">Send Message</button>
                    </div>
                </div>

                { result ? <div className="form-group"><Result /></div>  : null }
            </div>

        </form>
    )
}
export default ContactUsForm;