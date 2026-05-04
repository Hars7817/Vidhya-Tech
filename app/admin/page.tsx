'use client';

import { useEffect, useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  order: number;
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  order: number;
}

interface ContactItem {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string;
}

interface ApiList<T> {
  data?: T[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs: Tab[] = [
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contacts', label: 'Contact Messages' },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [servicesRes, portfolioRes, contactsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/portfolio'),
          fetch('/api/contact'),
        ]);

        if (servicesRes.ok) {
          const servicesData = (await servicesRes.json()) as ApiList<ServiceItem>;
          if (isMounted) setServices(servicesData.data ?? []);
        }

        if (portfolioRes.ok) {
          const portfolioData = (await portfolioRes.json()) as ApiList<PortfolioItem>;
          if (isMounted) setPortfolios(portfolioData.data ?? []);
        }

        if (contactsRes.ok) {
          const contactsData = (await contactsRes.json()) as ApiList<ContactItem>;
          if (isMounted) setContacts(contactsData.data ?? []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = type === 'services' ? '/api/services' : '/api/portfolio';
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        if (type === 'services') {
          setServices((current) => current.filter((service) => service.id !== id));
        } else {
          setPortfolios((current) => current.filter((project) => project.id !== id));
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Title</th>
                    <th className="px-6 py-3 text-left font-semibold">Description</th>
                    <th className="px-6 py-3 text-left font-semibold">Order</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{service.title}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                        {service.description}
                      </td>
                      <td className="px-6 py-4">{service.order}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete('services', service.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Portfolio Projects</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Title</th>
                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                    <th className="px-6 py-3 text-left font-semibold">Order</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolios.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{project.title}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">{project.order}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete('portfolio', project.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Messages ({contacts.length})</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                      {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{contact.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
