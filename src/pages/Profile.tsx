import { useState } from "react";

const interestsList = [
  "Technology",
  "Health",
  "Climate",
  "Science",
  "Politics",
  "Sports",
];

export default function Profile() {
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile - Interests</h1>
      <div className="space-y-2">
        {interestsList.map((interest) => (
          <label
            key={interest}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={interests.includes(interest)}
              onChange={() => toggleInterest(interest)}
              className="checkbox checkbox-primary"
            />
            <span>{interest}</span>
          </label>
        ))}
      </div>

      <button
        className="btn btn-primary mt-6"
        onClick={() => alert("Profile saved! (mock)")}
      >
        Save Profile
      </button>
    </main>
  );
}
