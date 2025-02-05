import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin, useRegister } from '../hook/useAuth'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Singin() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglebtn, setTogglebtn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // สลับระหว่าง true/false
  };

  const { login, error: loginError, isPending: loginPending } = useLogin()
  const { register, error: registerError, isPending: registerPending } = useRegister()


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate(-1)
    } catch (error) {
      toast.error(error.message || 'เกิดข้อผิดพลาดบางอย่าง กรุณาลองอีกครั้งหรือติดต่อเจ้าหน้าที่' , {
        position: 'top-center',
        autoClose: 3000, // ปิดอัตโนมัติใน 5 วินาที
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password)
      setTogglebtn(false)
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองอีกครั้งหรือติดต่อเจ้าหน้าที่' || error.message, {
        position: 'top-center',
        autoClose: 3000, // ปิดอัตโนมัติใน 3 วินาที
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }


  return (
    <>
      <ToastContainer />
      <div className='flex justify-center items-center min-h-screen mx-auto bg-[#fff6f6]'>
        {/* <box-icon name='loader' animation='spin' flip='horizontal' ></box-icon> */}
        {!togglebtn ? (
          <form onSubmit={handleLogin}>
            <div className='flex flex-col items-center gap-3 p-4 px-12 bg-white rounded-md border-2 border-yellow-400 '>
              <h2 className='font-semibold text-2xl'>เข้าสู่ระบบ</h2>

              <div className='flex flex-col'>
                <div className='flex items-center justify-between'>
                  <label className='text-lg font-medium'>Email</label>

                  {loginError?.status === 404 && (
                    <p className='text-red-500 text-center text-sm'>{loginError?.message}</p>
                  )}
                </div>
                <input
                  className='border-black border-2 rounded-md p-1 w-60'
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                />
              </div>

              <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                  <label className='text-lg font-medium'>Password</label>
                  {loginError?.status === 401 && (
                    <p className='text-red-500 text-sm'>{loginError?.message}</p>
                  )}
                </div>
                <div className='flex items-center p-1 w-60 border-2 border-black rounded-md'>
                  <input
                    className='outline-none'
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                  />
                  <div className='flex items-center cursor-pointer' onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <box-icon name='hide' ></box-icon> // ไอคอน Hide
                    ) : (
                      <box-icon name='show'></box-icon> // ไอคอน Show
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-between items-center w-full my-5 gap-4'>
                <button type="submit"
                  className='bg-yellow-300 p-2 rounded-md font-medium hover:bg-transparent hover:ring-2 hover:ring-yellow-300 duration-200 '
                >
                  {loginPending ? (
                    "กำลังเข้าสู่ระบบ..."
                  ) : (
                    "เข้าสู่ระบบ"
                  )}
                </button>

                <span className='underline cursor-pointer' onClick={() => { setTogglebtn(true) }}>สมัครใช้งาน</span>
              </div>

            </div>

          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className='flex flex-col items-center gap-3 p-4 px-12 bg-white rounded-md border-2 border-yellow-400 '>
              <h2 className='font-semibold text-2xl'>สมัครใช้งาน</h2>

              <div className='flex flex-col'>
                <label className='text-lg font-medium'>Name</label>
                <input
                  className='border-black border-2 rounded-md p-1 w-60'
                  type="text"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  required
                />
              </div>

              <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                  <label className='text-lg font-medium'>Email</label>
                  <p className='text-red-500 text-sm'>{registerError}</p>
                </div>
                <input
                  className='border-black border-2 rounded-md p-1 w-60'
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                />
              </div>


              <div className='flex flex-col'>
                <label className='text-lg font-medium'>Password</label>
                <div className='flex items-center p-1 w-60 border-2 border-black rounded-md'>
                  <input
                    className='outline-none'
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                  />
                  <div className='flex items-center cursor-pointer' onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <box-icon name='hide' ></box-icon> // ไอคอน Hide
                    ) : (
                      <box-icon name='show'></box-icon> // ไอคอน Show
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-between items-center w-full my-5 gap-4'>
                <button type="submit"
                  className='bg-yellow-300 p-2 rounded-md font-medium hover:bg-transparent hover:ring-2 hover:ring-yellow-300 duration-200 '
                >
                  {registerPending ? (
                    "กำลังสมัครใช้งาน..."
                  ) : (
                    "สมัครใช้งาน"
                  )}
                </button>
                <span className='underline cursor-pointer' onClick={() => { setTogglebtn(false) }}>เข้าสู่ระบบ</span>
              </div>

            </div>

          </form>
        )}


      </div>
    </>
  );
}

export default Singin
