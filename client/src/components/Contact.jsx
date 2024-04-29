import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const { currentUser,accessToken } = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/${listing.author}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.author]);

  const sendMessage = async () => {
    const res = await fetch(`${API_URL}/api/user/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        sender: currentUser.email,
        receiver: landlord.email,
        subject: `Interested in talking about your Listing, ${listing.name}`,
        message,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("");
      toast("Email successfully sent!");
    } else {
      toast("Error while sending email, please retry");
    }
    console.log(data);
  };

  return (
    <>
      <ToastContainer />
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
            required
          ></textarea>

          {/* <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link> */}
          <button
            type="submit"
            onClick={sendMessage}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
