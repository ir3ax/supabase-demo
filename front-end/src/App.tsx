import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";

interface Students {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  age?: number;
}

function App() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [students, setStudents] = useState<Students[] | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from('students').select();

        if (error) {
          setFetchError('Cannot fetch students data.');
          setStudents(null);
        } else {
          if (data && data.length > 0) {
            setStudents(data);
            setFetchError(null);
          } else {
            setStudents(null);
            setFetchError('No students found.');
          }
        }
      } catch (error) {
        setFetchError('Error fetching students data.');
        setStudents(null);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className='flex flex-col w-full h-[90vh]'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden p-4 w-full h-full flex justify-center items-center flex-col'>
            <table className='min-w-full text-left text-sm font-light text-surface rounded-md'>
              <thead className='border-b border-neutral-200 font-medium text-gray-300 bg-[#0F172A]'>
                <tr>
                  <th scope='col' className='px-6 py-4'>First Name</th>
                  <th scope='col' className='px-6 py-4'>Last Name</th>
                  <th scope='col' className='px-6 py-4'>Email</th>
                  <th scope='col' className='px-6 py-4'>Age</th>
                </tr>
              </thead>
              <tbody className='bg-[#203158]'>
                {students && students.map((student, index) => (
                  <tr key={index} className='border-b border-neutral-200 text-gray-200'>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>{student.first_name}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.last_name}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.email}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {fetchError && (
              <div className='border-b border-neutral-200 text-gray-200 w-full flex justify-center items-center'>
                <p className='px-6 py-4 text-red-500'>{fetchError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
