import React, {useState} from "react";
import "./settings.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy & Security" },
    { id: "notifications", label: "Notifications" },
    { id: "language", label: "Language & Region" },
  ];

  return (
    <div className="settings">
      <aside className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="settings-content">
        {activeTab === "account" && (
          <div>
            <h3>Account Settings</h3>
            <label>
              Username
              <input type="text" placeholder="Your username" />
            </label>
            <label>
              Email
              <input type="email" placeholder="your@email.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button>Save Changes</button>
          </div>
        )}

        {activeTab === "privacy" && (
          <div>
            <h3>Privacy & Security</h3>
            <label>
              <input type="checkbox" />
              Show my profile in search results
            </label>
            <label>
              <input type="checkbox" />
              Enable two-factor authentication
            </label>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h3>Notification Settings</h3>
            <label>
              <input type="checkbox" />
              Email notifications
            </label>
            <label>
              <input type="checkbox" />
              Push notifications
            </label>
          </div>
        )}

        {activeTab === "language" && (
          <div>
            <h3>Language & Region</h3>
            <label>
              Language
              <select>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
            <label>
              Timezone
              <select>
                <option>UTC</option>
                <option>PST</option>
                <option>EST</option>
              </select>
            </label>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;