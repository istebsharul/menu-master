import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getProfile, updateProfile, clearProfileState } from "../../redux/slices/profileSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaUpload } from "react-icons/fa";

// Helper - create object URL and return a cleanup function
const createPreview = (file) => {
  const url = URL.createObjectURL(file);
  return { file, url };
};
       
const ImageSection = ({   
  title,
  existingItems,
  newFilesPreview,
  onAddFiles,
  onDelete,
  isEditing,
  accept = "image/*",
  inputId,
  maxFiles = 10,
  maxSizeBytes = 5 * 1024 * 1024,
}) => {
  const totalCount =
    (existingItems?.length || 0) + (newFilesPreview?.length || 0);

  const canAddMore = isEditing && totalCount < maxFiles;

  return (
    <div className="mb-6">
      <h2 className="font-medium mb-2">
        {title} ({totalCount})
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {/* Existing Images */}
        {(existingItems || []).map((item, idx) => (
          <div key={`existing-${item.id ?? idx}`} className="relative">
            <img
              src={item.url}
              alt={`${title} ${idx}`}
              className="w-full h-24 object-cover rounded-md border"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() =>
                  onDelete({ type: "existing", index: idx, id: item.id })
                }
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <FaTrash size={10} />
              </button>
            )}
          </div>
        ))}

        {/* New Image Previews */}
        {(newFilesPreview || []).map((p, idx) => (
          <div key={`new-${idx}`} className="relative">
            <img
              src={p.url}
              alt={`${title} new ${idx}`}
              className="w-full h-24 object-cover rounded-md border"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => onDelete({ type: "new", index: idx })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <FaTrash size={10} />
              </button>
            )}
          </div>
        ))}

        {/* Upload Box */}
        {canAddMore && (
          <label
            htmlFor={inputId}
            className="relative w-full h-24 flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaUpload className="text-xl text-gray-500" />
            <p className="text-xs text-gray-600">Upload</p>

            <input
              id={inputId}
              type="file"
              accept={accept}
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const files = Array.from(e.target.files || []).slice(
                  0,
                  maxFiles - totalCount
                );

                const valid = files.filter(
                  (f) =>
                    f.type.startsWith("image/") &&
                    f.size <= maxSizeBytes
                );

                if (files.length !== valid.length) {
                  toast.error(
                    `Some files were ignored. Max ${maxFiles} images, each ≤ ${
                      maxSizeBytes / 1024 / 1024
                    }MB`
                  );
                }

                onAddFiles(valid);
                e.target.value = null;
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();

  // select only needed slices to avoid unnecessary re-renders
  const { user, loading, error, success } = useSelector(
    state => ({
      user: state.profile.user,
      loading: state.profile.loading,
      error: state.profile.error,
      success: state.profile.success,
    }),
    shallowEqual
  );

  // text fields
  const [form, setForm] = useState({ name: "", email: "", phone: "", businessName: "" });

  // logo - keep existing and new separate
  const [existingLogo, setExistingLogo] = useState(null); // { id?, url }
  const [newLogo, setNewLogo] = useState(null); // { file, url }

  // banners & gallery - existing items as { id?, url } and new files with previews { file, url }
  const [existingBanners, setExistingBanners] = useState([]);
  const [newBanners, setNewBanners] = useState([]);

  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);

  // track ids (or indexes) of existing media marked for deletion
  const [toDeleteExistingBanners, setToDeleteExistingBanners] = useState([]);
  const [toDeleteExistingGallery, setToDeleteExistingGallery] = useState([]);
  const [toDeleteExistingLogo, setToDeleteExistingLogo] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  // Loading overlay for optimistic UI
  const [saving, setSaving] = useState(false);

  // --- EFFECTS ---
  // fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // when user is loaded, populate form and existing media states
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        businessName: user.businessName || "",
      });

      setExistingLogo(user.logo ? { id: user.logo.id ?? null, url: user.logo.url ?? user.logo } : null);
      setExistingBanners((user.banner || []).map((b, idx) => ({ id: b.id ?? null, url: b.url ?? b })));
      setExistingGallery((user.gallery || []).map((g, idx) => ({ id: g.id ?? null, url: g.url ?? g })));

      // clear new uploads
      // revoke any previews of previously selected new files
      newLogo && URL.revokeObjectURL(newLogo.url);
      newBanners.forEach(p => URL.revokeObjectURL(p.url));
      newGallery.forEach(p => URL.revokeObjectURL(p.url));
      setNewLogo(null);
      setNewBanners([]);
      setNewGallery([]);

      // reset delete lists
      setToDeleteExistingBanners([]);
      setToDeleteExistingGallery([]);
      setToDeleteExistingLogo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // clear success/error after showing toast
  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
      // keep optimistic saving state short
      setSaving(false);
      // clear redux transient state after ack
      const t = setTimeout(() => dispatch(clearProfileState()), 1500);
      return () => clearTimeout(t);
    }
    if (error) {
      toast.error(error.toString());
      setSaving(false);
    }
  }, [success, error, dispatch]);

  // cleanup when unmount - revoke created object urls
  useEffect(() => {
    return () => {
      if (newLogo) URL.revokeObjectURL(newLogo.url);
      newBanners.forEach(p => URL.revokeObjectURL(p.url));
      newGallery.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [newLogo, newBanners, newGallery]);

  // --- Handlers ---
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // logo change
  const handleLogoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Logo must be an image");
    if (file.size > 5 * 1024 * 1024) return toast.error("Logo must be <= 5MB");

    // revoke previous preview if any
    newLogo && URL.revokeObjectURL(newLogo.url);

    setNewLogo(createPreview(file));
    // if user wants to replace existing logo, mark it for deletion
    if (existingLogo) setToDeleteExistingLogo(true);
  };

  // generic add files helper for banners/gallery
  const addNewFiles = (files, setNewFiles) => {
    const valid = files
      .filter(f => f.type.startsWith("image/"))
      .map(f => createPreview(f));

    if (valid.length === 0) return;
    setNewFiles(prev => [...prev, ...valid]);
  };

  const handleBannerAdd = (files) => addNewFiles(files, setNewBanners);
  const handleGalleryAdd = (files) => addNewFiles(files, setNewGallery);

  // delete handler receives an object { type: 'existing'|'new', index, id }
  const handleDeleteBanner = ({ type, index }) => {
    if (type === "existing") {
      const item = existingBanners[index];
      if (item && item.id != null) {
        setToDeleteExistingBanners(prev => Array.from(new Set([...prev, item.id])));
      } else {
        // fallback: mark by url
        setToDeleteExistingBanners(prev => Array.from(new Set([...prev, item.url])));
      }
      // remove visually from existing list immediately
      setExistingBanners(prev => prev.filter((_, i) => i !== index));
    } else {
      // new file - revoke preview and remove
      setNewBanners(prev => {
        const item = prev[index];
        if (item) URL.revokeObjectURL(item.url);
        return prev.filter((_, i) => i !== index);
      });
    }
  };

  const handleDeleteGallery = ({ type, index }) => {
    if (type === "existing") {
      const item = existingGallery[index];
      if (item && item.id != null) {
        setToDeleteExistingGallery(prev => Array.from(new Set([...prev, item.id])));
      } else {
        setToDeleteExistingGallery(prev => Array.from(new Set([...prev, item.url])));
      }
      setExistingGallery(prev => prev.filter((_, i) => i !== index));
    } else {
      setNewGallery(prev => {
        const item = prev[index];
        if (item) URL.revokeObjectURL(item.url);
        return prev.filter((_, i) => i !== index);
      });
    }
  };

  const handleDeleteLogo = () => {
    if (newLogo) {
      URL.revokeObjectURL(newLogo.url);
      setNewLogo(null);
    }
    if (existingLogo) {
      setToDeleteExistingLogo(true);
      setExistingLogo(null);
    }
  };

  // validation
  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email";
    if (form.phone && !/^\+?[0-9\-\s]{7,20}$/.test(form.phone)) return "Invalid phone";
    return null;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateForm();
    if (err) return toast.error(err);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("businessName", form.businessName);

    if (newLogo) formData.append("logo", newLogo.file);
    if (toDeleteExistingLogo) formData.append("deleteLogo", "true");

    newBanners.forEach(p => formData.append("banner", p.file));
    console.log(newBanners);
    newGallery.forEach(p => formData.append("gallery", p.file));

    if (toDeleteExistingBanners.length > 0) formData.append("deletedBanners", JSON.stringify(toDeleteExistingBanners));
    if (toDeleteExistingGallery.length > 0) formData.append("deletedGallery", JSON.stringify(toDeleteExistingGallery));

    try {
      setSaving(true);
      // optimistic UI: update local state immediately (optional)
      // dispatch the action which should update the store on success
      await dispatch(updateProfile(formData));
      // after dispatch, redux success handler will trigger a toast and clear state
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // revert local changes only
    if (user) {
      setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "", businessName: user.businessName || "" });
      // revoke previews
      newLogo && URL.revokeObjectURL(newLogo.url);
      newBanners.forEach(p => URL.revokeObjectURL(p.url));
      newGallery.forEach(p => URL.revokeObjectURL(p.url));
      setNewLogo(null);
      setNewBanners([]);
      setNewGallery([]);

      // reload existing media from user
      setExistingLogo(user.logo ? { id: user.logo.id ?? null, url: user.logo.url ?? user.logo } : null);
      setExistingBanners((user.banner || []).map((b) => ({ id: b.id ?? null, url: b.url ?? b })));
      setExistingGallery((user.gallery || []).map((g) => ({ id: g.id ?? null, url: g.url ?? g })));

      setToDeleteExistingBanners([]);
      setToDeleteExistingGallery([]);
      setToDeleteExistingLogo(false);
    }
    setIsEditing(false);
  };

  // memoized previews for rendering
  const logoPreviewUrl = useMemo(() => newLogo?.url || existingLogo?.url || "", [newLogo, existingLogo]);
  const bannerExistingForRender = useMemo(() => existingBanners, [existingBanners]);
  const bannerNewForRender = useMemo(() => newBanners, [newBanners]);
  const galleryExistingForRender = useMemo(() => existingGallery, [existingGallery]);
  const galleryNewForRender = useMemo(() => newGallery, [newGallery]);

  // field renderer
  const renderField = (label, name, value, type = "text") => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <label htmlFor={name} className="font-medium w-full sm:w-1/3">{label}</label>
      {isEditing ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full sm:w-2/3"
          required={name === "name"}
          aria-required={name === "name"}
        />
      ) : (
        <div className="w-full sm:w-2/3 bg-gray-100 p-2 rounded-md text-gray-700">{value || "Not set"}</div>
      )}
    </div>
  );

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      <Toaster position="top-right" />

      <div className="relative p-6 w-5/6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} aria-label="Edit Profile" className="text-gray-500 hover:text-blue-600">
              <FaEdit className="text-xl" />
            </button>
          ) : null}
        </div>

        {/* Logo
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28">
            <img src={logoPreviewUrl || "https://image.similarpng.com/file/similarpng/very-thumbnail/2021/07/Chef-restaurant-logo-illustrations-template-on-transparent-background-PNG.png"} alt="Logo" className="w-full h-full p-4 object-cover border border-gray-300 shadow" />
          </div>

          {isEditing && (
            <div className="flex gap-2 items-center mt-3">
              <input type="file" accept="image/*" onChange={handleLogoChange} aria-label="Change logo" />
              {(existingLogo || newLogo) && (
                <button type="button" onClick={handleDeleteLogo} className="text-red-600" aria-label="Remove logo">Remove</button>
              )}
            </div>
          )}
        </div> */}

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 relative cursor-pointer">
            {/* Hidden file input */}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 opacity-0 z-20 cursor-pointer"
                aria-label="Change logo"
              />
            )}

            {/* Image Preview */}
            {logoPreviewUrl || existingLogo ? (
              <>
                <img
                  src={
                    logoPreviewUrl ||
                    existingLogo ||
                    "https://image.similarpng.com/file/similarpng/very-thumbnail/2021/07/Chef-restaurant-logo-illustrations-template-on-transparent-background-PNG.png"
                  }
                  alt="Logo"
                  className="w-full h-full p-4 object-cover border border-gray-300 shadow rounded"
                />

                {/* Overlay */}
                {isEditing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 text-white z-10 rounded">
                    <FaUpload className="text-2xl" />
                    <p className="text-xs">Click to Upload</p>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-blue-100/60 z-10 rounded">
                <FaUpload className="text-green-500 text-3xl" />
                <p className="text-xs">Click to Upload</p>
              </div>
            )}
          </div>

          {/* Remove button */}
          {isEditing && (existingLogo || logoPreviewUrl) && (
            <button
              type="button"
              onClick={handleDeleteLogo}
              className="mt-2 text-xs text-red-600 hover:underline"
            >
              Remove Logo
            </button>
          )}
        </div>

        {/* Loading & messages */}
        {loading && !saving && <p className="text-center text-gray-500 mb-4">Loading...</p>}
        {saving && <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">Saving...</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {renderField("Full Name", "name", form.name)}
          {renderField("Business Name", "businessName", form.businessName)}
          {renderField("Phone", "phone", form.phone, "tel")}
          {renderField("Email", "email", form.email, "email")}

          {/* Gallery section */}
          <ImageSection
            title="Gallery"
            existingItems={galleryExistingForRender}
            newFilesPreview={galleryNewForRender}
            onAddFiles={handleGalleryAdd}
            onDelete={handleDeleteGallery}
            isEditing={isEditing}
            inputId="gallery-input"
            maxFiles={12}
            maxSizeBytes={6 * 1024 * 1024}
          />

          {/* Banner section */}
          <ImageSection
            title="Banner"
            existingItems={bannerExistingForRender}
            newFilesPreview={bannerNewForRender}
            onAddFiles={handleBannerAdd}
            onDelete={handleDeleteBanner}
            isEditing={isEditing}
            inputId="banner-input"
            maxFiles={6}
            maxSizeBytes={8 * 1024 * 1024}
          />

          {isEditing && (
            <div className="flex justify-center gap-4 pt-6">
              <button type="submit" disabled={loading || saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50">Save Changes</button>
              <button type="button" onClick={handleCancel} disabled={loading || saving} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all disabled:opacity-50">Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;