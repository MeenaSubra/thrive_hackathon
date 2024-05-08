import { useState } from 'react';
import './App.css';

function App() {
  const [section, setSection] = useState(1);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    secondName: '',
    healthNumber: '',
    versionCode: '',
    sendNoticesByMail: false,
    sendNoticesByEmail: false,
    mailingAddress: '',
    cityTown: '',
    postalCode: '',
    streetNoAndName: '',
    dateOfBirth: '',
    emailAddress: '',
    signature: '',
    date: '',
    homeTelephone: '',
    workTelephone: '',
  });
  const [submitted, setSubmitted] = useState(false); 

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmitSection = async (event) => {
    event.preventDefault();
    //console.log("Section", section, "data:", formData);
    try {
      // Send form data to the server
      const response = await fetch('http://localhost:5000/submit-form', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Form data submitted successfully');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }

    setSection(section + 1);
    // Reset form data
    setFormData({
      lastName: '',
      firstName: '',
      secondName: '',
      healthNumber: '',
      versionCode: '',
      sendNoticesByMail: false,
      sendNoticesByEmail: false,
      mailingAddress: '',
      cityTown: '',
      postalCode: '',
      streetNoAndName: '',
      dateOfBirth: '',
      emailAddress: '',
      relationshipStatus: '',
      signature: '',
    date: '',
    homeTelephone: '',
    workTelephone: '',
    });
  };


  const onSubmitFinal = async (event) => {
    event.preventDefault();

    fetchFormData();
  };

  const fetchFormData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-form-data');
      if (response.ok) {
        const { formData } = await response.json();
        generatePdf(formData);
      } else {
        console.error('Failed to fetch form data');
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const generatePdf = async (formData) => {
    
      const response = await fetch('http://localhost:5000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.blob()) // Get the PDF data as a blob
      .then(blob => {
        // Create a URL object from the blob
        const url = window.URL.createObjectURL(blob);
        // Create an iframe element and set its source to the URL
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%'; // Adjust width and height as needed
        iframe.style.height = '500px';
        // Append the iframe to the body of your HTML document
        document.body.appendChild(iframe);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      });
  }
  };



  
  return (
    <div className="App">
      {section === 1 && (
        <form onSubmit={onSubmitSection}>
          <section>
            <h2>Section 1 - Enrolment with Family Doctor</h2>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*" required />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*" required />
          </div>
          <div className="form-group">
            <label htmlFor="secondName">Second Name</label>
            <input type="text" name="secondName" value={formData.secondName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*" required />
          </div>
          <div className="form-group">
            <label htmlFor="healthNumber">Health Number</label>
            <input type="text" name="healthNumber" value={formData.healthNumber} onChange={onChangeHandler} pattern="\d{10}" required />
          </div>
          <div className="form-group">
            <label htmlFor="versionCode">Version Code</label>
            <input type="text" name="versionCode" value={formData.versionCode} onChange={onChangeHandler} pattern="\d{2}" required />
          </div>
          <div className="form-group">
            <label>Send notices from my family doctor’s office to me by:</label>
            <div>
              <input type="checkbox" name="sendNoticesByMail" checked={formData.sendNoticesByMail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByMail">Regular Mail</label>
            </div>
            <div>
              <input type="checkbox" name="sendNoticesByEmail" checked={formData.sendNoticesByEmail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByEmail">Email</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mailingAddress">Mailing Address</label>
            
          </div>
          <div className="form-group">
            <label htmlFor="cityTown">City/Town</label>
            <input type="text" name="cityTown" value={formData.cityTown} onChange={onChangeHandler} required />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={onChangeHandler} pattern="\d{6}" required />
          </div>
          <div className="form-group">
            <label htmlFor="streetNoAndName">Street No. and Name or P.O. Box, Rural Route, General Delivery</label>
            <input type="text" name="streetNoAndName" value={formData.streetNoAndName} onChange={onChangeHandler} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={onChangeHandler} required />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={onChangeHandler} required />
          </div>
          <div className="form-group">
              <button className="btn" type="submit">Next Section</button>
            </div>
        </section>
      </form>
      )}

{section === 2 && (
        <form onSubmit={onSubmitSection}>
          <section>
            <h2>Section 2 - I want to enrol my child(ren) under 16 and/or dependent adult(s) with the family doctor identified in Section 4</h2>
            <h3>A</h3>
            <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*"  />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*" />
          </div>
          <div className="form-group">
            <label htmlFor="secondName">Second Name</label>
            <input type="text" name="secondName" value={formData.secondName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*"  />
          </div>
          <div className="form-group">
            <label htmlFor="healthNumber">Health Number</label>
            <input type="text" name="healthNumber" value={formData.healthNumber} onChange={onChangeHandler} pattern="\d{10}"  />
          </div>
          <div className="form-group">
            <label htmlFor="versionCode">Version Code</label>
            <input type="text" name="versionCode" value={formData.versionCode} onChange={onChangeHandler} pattern="\d{2}" />
          </div>
          <div className="form-group">
            <label>Send notices from my family doctor’s office to me by:</label>
            <div>
              <input type="checkbox" name="sendNoticesByMail" checked={formData.sendNoticesByMail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByMail">Regular Mail</label>
            </div>
            <div>
              <input type="checkbox" name="sendNoticesByEmail" checked={formData.sendNoticesByEmail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByEmail">Email</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mailingAddress">Mailing Address</label>
            
          </div>
          <div className="form-group">
            <label htmlFor="cityTown">City/Town</label>
            <input type="text" name="cityTown" value={formData.cityTown} onChange={onChangeHandler}  />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={onChangeHandler} pattern="\d{6}"  />
          </div>
          <div className="form-group">
            <label htmlFor="streetNoAndName">Street No. and Name or P.O. Box, Rural Route, General Delivery</label>
            <input type="text" name="streetNoAndName" value={formData.streetNoAndName} onChange={onChangeHandler}  />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={onChangeHandler}  />
          </div>

          <div className="form-group">
              <label>I'm this person's</label>
              <div>
                <input type="checkbox" name="parent" checked={formData.relationshipStatus === 'parent'} onChange={onChangeHandler} />
                <label htmlFor="parent">Parent</label>
              </div>
              <div>
                <input type="checkbox" name="legalGuardian" checked={formData.relationshipStatus === 'legalGuardian'} onChange={onChangeHandler} />
                <label htmlFor="legalGuardian">Legal Guardian</label>
              </div>
              <div>
                <input type="checkbox" name="attorney" checked={formData.relationshipStatus === 'attorney'} onChange={onChangeHandler} />
                <label htmlFor="attorney">Attorney for Personal Care</label>
              </div>
            </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={onChangeHandler}  />
          </div>


          <h3>B</h3>
            <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*"  />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*" />
          </div>
          <div className="form-group">
            <label htmlFor="secondName">Second Name</label>
            <input type="text" name="secondName" value={formData.secondName} onChange={onChangeHandler} pattern="[A-Za-z][A-Za-z]*"  />
          </div>
          <div className="form-group">
            <label htmlFor="healthNumber">Health Number</label>
            <input type="text" name="healthNumber" value={formData.healthNumber} onChange={onChangeHandler} pattern="\d{10}"  />
          </div>
          <div className="form-group">
            <label htmlFor="versionCode">Version Code</label>
            <input type="text" name="versionCode" value={formData.versionCode} onChange={onChangeHandler} pattern="\d{2}" />
          </div>
          <div className="form-group">
            <label>Send notices from my family doctor’s office to me by:</label>
            <div>
              <input type="checkbox" name="sendNoticesByMail" checked={formData.sendNoticesByMail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByMail">Regular Mail</label>
            </div>
            <div>
              <input type="checkbox" name="sendNoticesByEmail" checked={formData.sendNoticesByEmail} onChange={onChangeHandler} />
              <label htmlFor="sendNoticesByEmail">Email</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mailingAddress">Mailing Address</label>
            
          </div>
          <div className="form-group">
            <label htmlFor="cityTown">City/Town</label>
            <input type="text" name="cityTown" value={formData.cityTown} onChange={onChangeHandler}  />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={onChangeHandler} pattern="\d{6}"  />
          </div>
          <div className="form-group">
            <label htmlFor="streetNoAndName">Street No. and Name or P.O. Box, Rural Route, General Delivery</label>
            <input type="text" name="streetNoAndName" value={formData.streetNoAndName} onChange={onChangeHandler}  />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={onChangeHandler}  />
          </div>

          <div className="form-group">
              <label>I'm this person's</label>
              <div>
                <input type="checkbox" name="parent" checked={formData.relationshipStatus === 'parent'} onChange={onChangeHandler} />
                <label htmlFor="parent">Parent</label>
              </div>
              <div>
                <input type="checkbox" name="legalGuardian" checked={formData.relationshipStatus === 'legalGuardian'} onChange={onChangeHandler} />
                <label htmlFor="legalGuardian">Legal Guardian</label>
              </div>
              <div>
                <input type="checkbox" name="attorney" checked={formData.relationshipStatus === 'attorney'} onChange={onChangeHandler} />
                <label htmlFor="attorney">Attorney for Personal Care</label>
              </div>
            </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={onChangeHandler}  />
          </div>
            <div className="form-group">
              <button className="btn" type="submit">Next Section</button>
            </div>
          </section>
        </form>
      )}

{section === 3 && (
        <form onSubmit={onSubmitSection}>
          <section>
            <h2>Section 3 - Signature</h2>
            <p>
              I have read and agree to the Patient Commitment, the Consent to Release Personal Health Information and the Cancellation Conditions on the back of this form. I acknowledge that this Enrolment is not intended to be a legally binding contract and is not intended to give rise to any new legal obligations between my family doctor and me.
            </p>
            <div className="form-group">
              <label>Signing on behalf of:</label>
              <div>
                <input type="checkbox" name="myself" checked={formData.myself} onChange={onChangeHandler} />
                <label htmlFor="myself">Myself</label>
              </div>
              <div>
                <input type="checkbox" name="children" checked={formData.children} onChange={onChangeHandler} />
                <label htmlFor="children">Child(ren)</label>
              </div>
              <div>
                <input type="checkbox" name="dependentAdults" checked={formData.dependentAdults} onChange={onChangeHandler} />
                <label htmlFor="dependentAdults">Dependent Adult(s)</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} required />
            </div>
            <div className="form-group">
              <label htmlFor="signatureFile">Upload Signature (JPG/JPEG/PDF)</label>
              <input type="file" accept=".jpg,.jpeg,.pdf" name="signatureFile" onChange={onChangeHandler} required />
              <span className="signature-box">X</span>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date (yyyy/mm/dd)</label>
              <input type="text" name="date" value={formData.date} onChange={onChangeHandler} required pattern="\d{4}/\d{2}/\d{2}" />
            </div>
            <div className="form-group">
              <label htmlFor="homeTelephone">Home Telephone</label>
              <input type="tel" name="homeTelephone" value={formData.homeTelephone} onChange={onChangeHandler} required pattern="\(\d{3}\) \d{3}-\d{4}" />
            </div>
            <div className="form-group">
              <label htmlFor="workTelephone">Work Telephone</label>
              <input type="tel" name="workTelephone" value={formData.workTelephone} onChange={onChangeHandler} required pattern="\(\d{3}\) \d{3}-\d{4}" />
            </div>
            <div className="form-group">
              <button className="btn" type="submit">Submit</button>
            </div>
          </section>

          
        </form>

        
      )}

{section === 4 && (
        <form onSubmit={onSubmitFinal}>
          <section>
            <h2>Section 4 - Family doctor information</h2>
      <p>
        Dr. Emily Thompson is a compassionate family physician dedicated to providing comprehensive healthcare services to individuals of all ages in the community of Maplewood. With over 10 years of experience, Dr. Thompson emphasizes a patient-centered approach, prioritizing open communication and collaboration to address each patient's unique healthcare needs. She has a strong focus on preventive care, chronic disease management, and promoting overall wellness. Dr. Thompson is known for her warm bedside manner and her commitment to building trusting relationships with her patients, ensuring they feel empowered and supported in their healthcare journey. She is actively involved in medical research and stays updated on the latest advancements in family medicine to deliver the highest quality care to her patients. Dr. Thompson welcomes new patients and looks forward to serving the Maplewood community with excellence and compassion.
      </p>
      
      <div className="form-group">
        <label htmlFor="date">Date (yyyy/mm/dd)</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={onChangeHandler} 
          required 
        />
      </div>
      <button className="btn" type="submit">Final Submit</button>
          </section>
        </form>
      )}

      {submitted && <p>PDF generated successfully!</p>}
    </div>
  );
}

export default App;


