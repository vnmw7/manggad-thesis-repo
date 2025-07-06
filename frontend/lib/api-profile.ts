import { supabase } from './supabase';

export interface PublicProfile {
  prf_id: string;
  prf_user_id: string;
  prf_name: string;
  prf_email: string;
  prf_affiliation: string | null;
  prf_department: string | null;
  prf_degree_program: string | null;
  prf_author_bio: string | null;
  prf_image_url: string;
  prf_created_at: string;
}

export const fetchUserProfile = async (userId: string): Promise<PublicProfile & { role?: string } | null> => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    
    if (!authData.user || authData.user.id !== userId) {
      return null;
    }

    const { data, error } = await supabase
      .from('tblprofiles')
      .select(`
        prf_id,
        prf_user_id,
        prf_name,
        prf_email,
        prf_affiliation,
        prf_department,
        prf_degree_program,
        prf_author_bio,
        prf_image_url,
        prf_created_at
      `)
      .eq('prf_user_id', userId)
      .single();

    if (error) throw error;

    return {
      ...data,
      role: authData.user.role
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const fetchPublicProfile = async (prf_user_id: string): Promise<PublicProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('tblprofiles')
      .select(`
        prf_id,
        prf_user_id,
        prf_name,
        prf_email,
        prf_affiliation,
        prf_department,
        prf_degree_program,
        prf_author_bio,
        prf_image_url,
        prf_created_at
      `)
      .eq('prf_user_id', prf_user_id)
      .single();

    if (error) {
      console.error('Error fetching public profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
};

export const fetchAllPublicProfiles = async (): Promise<PublicProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('tblprofiles')
      .select(`
        prf_id,
        prf_user_id,
        prf_name,
        prf_email,
        prf_affiliation,
        prf_department,
        prf_degree_program,
        prf_author_bio,
        prf_image_url,
        prf_created_at
      `)
      .order('prf_created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public profiles:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching profiles:', error);
    return [];
  }
};

// Helper function to get user's published works count
export const fetchUserThesesCount = async (authorName: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('thesis_tbl')
      .select('id')
      .or(`firstName.ilike.%${authorName}%,lastName.ilike.%${authorName}%`);

    if (error) {
      console.error('Error fetching theses count:', error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error('Unexpected error fetching theses count:', error);
    return 0;
  }
};
